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
    socket: {
      isConnected: false,
      isReconnect: false,
      reconnectError: false,
    },
  },
  getters: {
    watchList(state) {
      return state.watchList
    },
    watchListVisible(state) {
      return state.watchListVisible
    },
    tickerList(state) {
      return state.tickerList
    },
    socket(state) {
      return state.socket
    },
    klineSelected(state) {
      return state.klineSelected
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

      const kline = await binanceApi.klineGet({
        interval: '1h',
        symbol: klineSelected,
      })

      console.log(kline)
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

    streamsSubscribe({state}) {
      const {watchList} = state
      if (watchList.length) binanceApi.watchListSubscribe(watchList)
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

    klineSelect({commit}, ticker) {
      commit('klineSelect', ticker)
      storage.klineSelectedSet(ticker)
      // binanceApi.klineSelect(ticker)
      // console.log(ticker)
    },
  },
  modules: {},
})
