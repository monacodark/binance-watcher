<script>
import {BinanceClient} from './services/BinanceClient'

const binanceClient = new BinanceClient()

export default {
  name: 'app',
  components: {},
  data: () => ({
    //
  }),
  async mounted() {
    const info = await binanceClient.getKlines({
      symbol: 'BNBBTC',
      interval: '15md',
    })
    console.log(info)
  },
}
</script>

<template>
  <v-app>
    <v-app-bar
      app
      color=""
      dark>
      <v-toolbar-title
        class="font-weight-black primary--text"
        color="">
        BINANCE WATCHER
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>

    <div class="main-wrapper">
      <router-view />
    </div>
  </v-app>
</template>

<style lang="scss">
  .main-wrapper {
    padding-top: 75px;
  }
</style>
