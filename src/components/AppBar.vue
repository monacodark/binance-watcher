<script>
import Intervals from './Intervals'

export default {
  name: 'app-bar',
  components: {
    'intervals': Intervals,
  },
  props: {
    socketIsConnected: Boolean,
    watchListVisible: Boolean,
    intervalSelected: String,
  },
  data() {
    return {
      intervals: ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'],
    }
  },
  methods: {
    watchListVisibleToogle() {
      this.$emit('toogleVisible', !this.watchListVisible)
    },
  },
}
</script>

<template>
  <v-app-bar
    app
    color=""
    dark>
    <intervals
      :intervals="intervals"
      :intervalSelected="intervalSelected"
      @intervalSelect="$emit('intervalSelect', $event)" />
    <!-- <v-toolbar-title
      class="font-weight-black primary--text"
      color="">
      BINANCE WATCHER
    </v-toolbar-title> -->

    <v-spacer />

    <div class="connection-status-bar">
      <v-icon
        v-if="socketIsConnected"
        color="green"
        v-text="'mdi-check-all'" />

      <v-icon
        v-else
        color="blue"
        v-text="'mdi-timer-sand-empty'" />
    </div>

    <v-btn
      :class="watchListVisible ? '' : 'watchlist-btn_depressed'"
      :outlined="watchListVisible"
      color="primary"
      small
      @click="watchListVisibleToogle">
      Watchlist
    </v-btn>
  </v-app-bar>
</template>
