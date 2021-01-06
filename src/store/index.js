import Vue from 'vue'
import Vuex from 'vuex'

import {BinanceRest} from '@/services/BinanceRest'
// import {BinanceWebsocket} from '~/services/BinanceWebsocket'
import {Storage} from '@/services/Storage'

const binanceRest = new BinanceRest()
// const binanceWebsocket = new BinanceWebsocket()
const storage = new Storage()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchListVisible: true,
    watchList: [],
    tickerList: [],
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
  },
  mutations: {
    SOCKET_ONOPEN(state, data) {
      console.log('open', data, state)
      return
    },
    SOCKET_ONMESSAGE(state, payload) {
      console.log('Message', payload)
      // const {stream} = payload

      // if (!stream) return

      // const isStreamKline = stream.indexOf('kline') > -1

      // if (isStreamKline) {
      //   const currentPrice = +payload.data.k.c
      //   const ticker = payload.data.k.s.toLowerCase()

      //   if (!currentPrice || !ticker) return

      //   state.watchList.map((_ticker) => {
      //     if (ticker === _ticker.ticker) {
      //       _ticker.price = currentPrice
      //     }
      //   })
      // }
    },
    SOCKET_ONERROR(state, payload) {
      console.log('error', payload)
    },
    SOCKET_ONCLOSE(state, payload) {
      console.log('close', payload)
    },
    SOCKET_RECONNECT(state, payload) {
      console.log('reconnect', payload)
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
    watchListRemove(state, payload) {
      state.watchList = state.watchList.filter(
          (item) => item.ticker !== payload,
      )
    },
  },
  actions: {
    async loadTickerList({commit}) {
      const {success, data, message} = await binanceRest.getExchangeInfo()

      if (!success) console.log(message)

      console.log(data.symbols)

      const tickerList = data.symbols.map((ticker) => {
        if (ticker.status !== 'TRADING') return false
        return {ticker: ticker.symbol.toLowerCase()}
      }).filter((ticker) => ticker)

      commit('tickerListSet', tickerList)
    },

    initLocalData({commit}) {
      const watchList = storage.watchListGet()
      commit('watchListSet', watchList)

      const watchListVisible = storage.watchListVisibleGet()
      commit('watchListVisibleSet', watchListVisible)
    },

    watchListVisibleSet({commit}, payload) {
      commit('watchListVisibleSet', payload)
      storage.watchListVisibleSet(payload)
    },

    watchListAdd({commit}, payload) {
      // binanceWebsocket.subscribe('aggTrade', [payload])

      const newTicker = {
        ticker: payload,
        price: null,
      }

      commit('watchListAdd', newTicker)
      storage.watchListAdd(newTicker)
    },

    watchListRemove({commit}, payload) {
      commit('watchListRemove', payload)
      storage.watchListRemove(payload)
    },
  },
  modules: {},
})
