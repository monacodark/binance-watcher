import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

/**
* @param {object} ctx
*/
export default function({store}) {
  Vue.use(
      VueNativeSock,
      'wss://stream.binance.com:9443/stream?streams=bnbbtc@trade/ethbtc@trade',
      {
        store: store,
        reconnection: true,
        reconnectionDelay: 3000,
        format: 'json',
      },
  )
}
