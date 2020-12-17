export const state = () => ({
  watchlistVisible: false,
})

export const getters = {
  watchlistVisible(state) {
    return state.watchlistVisible
  },
}

export const mutations = {
  SOCKET_ONOPEN(ctx, data) {
    // console.log('Open', data, ctx)
  },
  SOCKET_ONMESSAGE(ctx, data) {
    // console.log('Message', data)
  },
  watchlistVisible(state, payload) {
    state.watchlistVisible = payload
  },
}

export const actions = {
  setWatchlistVisible({commit}, payload) {
    commit('watchlistVisible', payload)
  },
}
