import Vue from 'vue'
import Vuex from 'vuex'

import {BinanceApi} from '@/services/BinanceApi'
import {Storage} from '@/services/Storage'

Vue.use(Vuex)

const binanceApi = new BinanceApi()
const storage = new Storage()

export default new Vuex.Store({
  state: {
    watchListVisible: true,
    watchList: [],
    tickerList: [],
    klineSelected: null,
    chartKline: [],
    chart: {
      ticker: null,
      kline: [],
      interval: null,
    },
    socket: {
      isConnected: false,
      isReconnect: false,
      reconnectError: false,
    },
    intervalSelected: '1h',
  },
  getters: {
    socket(state) {
      return state.socket
    },
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      // Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      state.socket.isReconnect = false
      state.socket.reconnectError = false

      console.log('SOCKET_ONOPEN')
    },
    SOCKET_ONMESSAGE(state, payload) {
      const {stream, data} = payload

      const isStreamAggTrade = stream && stream.indexOf('aggTrade') > -1
      const isStreamKline = stream && stream.indexOf('kline') > -1

      if (isStreamAggTrade) {
        const {
          s: ticker,
          p: price,
        } = data

        // console.log('aggTrade', ticker, price)

        if (!price || !ticker) return

        state.watchList.map((item) => {
          if (ticker.toLowerCase() === item.ticker) {
            const isUSD = item.ticker.indexOf('usd') > 1
            if (isUSD) item.price = Number(price).toFixed(2)
            else item.price = price
          }
        })

        return
      } else if (isStreamKline) {
        const isCurrentTicker = state.klineSelected === data.k.s.toLowerCase()

        if (!isCurrentTicker) return

        const {
          t: openTime,
          o: open,
          h: high,
          l: low,
          c: close,
          v: volume,
        } = data.k

        const {chartKline} = state

        if (!chartKline.length) return

        const newKline = [
          openTime,
          Number(open),
          Number(high),
          Number(low),
          Number(close),
          Number(volume),
        ]

        const needAdd = (
          chartKline[chartKline.length - 1][0] < openTime
        )

        const needUpdate = (
          chartKline[chartKline.length - 1][0] === openTime
        )

        if (needAdd) {
          chartKline.push(newKline)
        } else if (needUpdate) {
          chartKline.pop()
          chartKline.push(newKline)
        }

        return
      }

      console.log('SOCKET_ONMESSAGE', payload)
    },
    SOCKET_ONERROR(state, event) {
      console.error('SOCKET_ONERROR', state, event)
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false
      state.socket.reconnectError = false

      console.log('SOCKET_ONCLOSE')
    },
    SOCKET_RECONNECT(state) {
      state.socket.isReconnect = true
      console.log('SOCKET_RECONNECT')
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true
    },

    tickerListSet(state, payload) {
      state.tickerList = payload
    },
    watchListVisibleSet(state, payload) {
      state.watchListVisible = payload
    },
    watchListSet(state, payload) {
      state.watchList = payload
    },
    watchListAdd(state, payload) {
      state.watchList.push(payload)
    },
    watchListRemove(state, ticker) {
      state.watchList = state.watchList.filter(
          (item) => item.ticker !== ticker,
      )
    },
    klineSelect(state, ticker) {
      state.klineSelected = ticker
    },
    chartKlineSet(state, kline) {
      state.chartKline = kline
    },
    intervalSelect(state, interval) {
      state.intervalSelected = interval
    },
  },
  actions: {
    async tickerListLoad({commit}) {
      const {
        success,
        tickerList,
        message,
      } = await binanceApi.tickerListGet()

      if (!success) {
        console.log(message)
        return false
      }

      commit('tickerListSet', tickerList)
    },

    async localDataInit({commit}) {
      const watchListVisible = storage.watchListVisibleGet()
      commit('watchListVisibleSet', watchListVisible)

      const watchList = storage.watchListGet()
      commit('watchListSet', watchList)

      const klineSelected = (
        storage.klineSelectedGet() || watchList[0].ticker || null
      )
      commit('klineSelect', klineSelected)

      const intervalSelected = (
        storage.intervalSelectedGet() || '1h'
      )
      commit('intervalSelect', intervalSelected)

      const {success, data: kline, message} = await binanceApi.klineGet({
        interval: intervalSelected,
        symbol: klineSelected,
      })

      if (!success) {
        console.log('localDataInit Error', message)
        return
      }

      commit('chartKlineSet', kline)
    },

    watchListVisibleSet({commit, state}, visibled) {
      commit('watchListVisibleSet', visibled)
      storage.watchListVisibleSet(visibled)

      const {watchList} = state

      if (watchList.length) {
        if (visibled) binanceApi.watchListSubscribe(watchList)
        else binanceApi.watchListUnsubscribe(watchList)
      }
    },

    streamsInitSubscribe({state}) {
      const {watchList, klineSelected} = state

      if (watchList.length) binanceApi.watchListSubscribe(watchList)
      if (klineSelected) binanceApi.klineStart(klineSelected, '1h')
    },

    watchListAdd({commit}, ticker) {
      binanceApi.watchListAdd(ticker)

      const newTicker = {
        ticker,
        price: null,
      }

      commit('watchListAdd', newTicker)
      storage.watchListAdd(newTicker)
    },

    watchListRemove({commit}, ticker) {
      binanceApi.watchListRemove(ticker)

      commit('watchListRemove', ticker)
      storage.watchListRemove(ticker)
    },

    async klineSelect({commit, state}, ticker) {
      const {klineSelected, intervalSelected} = state

      if (klineSelected === ticker) return

      binanceApi.klineStop(klineSelected, intervalSelected)

      commit('klineSelect', ticker)
      commit('chartKlineSet', [])

      const {success, data: kline, message} = await binanceApi.klineGet({
        interval: intervalSelected,
        symbol: ticker,
      })

      if (!success) {
        console.log('localDataInit Error', message)
        return
      }

      commit('chartKlineSet', kline)
      storage.klineSelectedSet(ticker)

      binanceApi.klineStart(ticker, intervalSelected)
    },

    async intervalSelect({commit, state}, interval) {
      const {klineSelected, intervalSelected} = state


      if (intervalSelected === interval) return

      binanceApi.klineStop(klineSelected, intervalSelected)

      commit('intervalSelect', interval)
      commit('chartKlineSet', [])

      const {success, data: kline, message} = await binanceApi.klineGet({
        interval,
        symbol: klineSelected,
      })

      if (!success) {
        console.log('intervalSelect Error', message)
        return
      }

      commit('chartKlineSet', kline)
      storage.intervalSelectedSet(interval)

      binanceApi.klineStart(klineSelected, interval)
    },
  },
  modules: {},
})
