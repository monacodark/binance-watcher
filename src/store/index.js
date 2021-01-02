import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlistVisible: false,
    watchList: [],
    tickerList: [],
  },
  getters = {
    watchList(state) {
      return state.watchList
    },
    watchlistVisible(state) {
      return state.watchlistVisible
    },
    tickerList(state) {
      return state.tickerList
    },
  },
  mutations: {},
  actions: {
    SOCKET_ONOPEN(state, data) {
      console.log('Open', data, state)
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
    watchlistVisible(state, payload) {
      state.watchlistVisible = payload
    },
    tickerList(state, payload) {
      state.tickerList = payload
    },
    watchListAdd(state, payload) {
      state.watchList.push(payload)
    },
    watchListSet(state, payload) {
      state.watchList = payload
    },
  },
  modules: {},
})
