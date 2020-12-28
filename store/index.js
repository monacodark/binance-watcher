import {BinanceRest} from '~/services/BinanceRest'
// import {BinanceWebsocket} from '~/services/BinanceWebsocket'
import {Storage} from '@/services/Storage'

const binanceRest = new BinanceRest()
// const binanceWebsocket = new BinanceWebsocket()
const storage = new Storage()

export const state = () => ({
  watchlistVisible: false,
  watchList: [],
  tickerList: [],
})

export const getters = {
  watchList(state) {
    return state.watchList
  },
  watchlistVisible(state) {
    return state.watchlistVisible
  },
  tickerList(state) {
    return state.tickerList
  },
}

export const mutations = {
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
}

export const actions = {
  setWatchlistVisible({commit}, payload) {
    commit('watchlistVisible', payload)
  },

  async loadTickerList({commit}) {
    const {success, data, message} = await binanceRest.getExchangeInfo()

    if (!success) console.log(message)

    console.log(data.symbols)

    const tickerList = data.symbols.map((ticker) => {
      if (ticker.status !== 'TRADING') return false
      return {ticker: ticker.symbol.toLowerCase()}
    }).filter((ticker) => ticker)

    commit('tickerList', tickerList)
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

  initLocalData({commit}) {
    const watchListFromStorage = storage.watchListGet()
    commit('watchListSet', watchListFromStorage)
  },
}
