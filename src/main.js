import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(
    VueNativeSock,
    'wss://stream.binance.com:9443/stream', // /stream?streams=btcusdt@miniTicker
    {
      store: store,
      reconnection: true,
      reconnectionDelay: 3000,
      format: 'json',
    },
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
