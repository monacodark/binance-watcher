import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(
    VueNativeSock,
    'wss://stream.binance.com:9443/stream', // /stream?streams=btcusdt@miniTicker
    {
      store,
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
