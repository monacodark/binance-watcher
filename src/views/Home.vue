<script>
import WatchList from '@/components/WatchList'
import Chart from '@/components/Chart'
import AppBar from '@/components/AppBar'

export default {
  name: 'home',
  components: {
    'watch-list': WatchList,
    'chart': Chart,
    'app-bar': AppBar,
  },
  data() {
    return {
      // connection: null,
    }
  },
  computed: {
    watchList() {
      return this.$store.getters.watchList
    },
    watchListVisible() {
      return this.$store.getters.watchListVisible
    },
    socketIsConnected() {
      return this.$store.getters.socket.isConnected
    },
    tickerList() {
      return this.$store.getters.tickerList
    },
    klineSelected() {
      return this.$store.getters.klineSelected
    },
  },
  watch: {
    socketIsConnected(isConnected) {
      if (isConnected) this.$store.dispatch('streamsSubscribe')
    },
  },
  mounted() {
    this.$store.dispatch('localDataInit')
    this.$store.dispatch('tickerListLoad')
  },
  methods: {
    watchListVisibleToogle(val) {
      this.$store.dispatch('watchListVisibleSet', val)
    },
    watchListAdd(val) {
      this.$store.dispatch('watchListAdd', val)
    },
    watchListRemove(val) {
      this.$store.dispatch('watchListRemove', val)
    },
    klineSelect(val) {
      this.$store.dispatch('klineSelect', val)
    },
  },
}
</script>

<template>
  <div class="home">
    <app-bar
      :socketIsConnected="socketIsConnected"
      :watchListVisible="watchListVisible"
      @toogleVisible="watchListVisibleToogle($event)" />

    <v-container :fluid="true">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          :sm="watchListVisible ? '8' : '12'"
          :lg="watchListVisible ? '9' : '12'">
          <chart />
        </v-col>

        <v-col
          v-if="watchListVisible"
          cols="12"
          xs="12"
          sm="4"
          lg="3">
          <watch-list
            :watchList="watchList"
            :tickerList="tickerList"
            :klineSelected="klineSelected"
            @watchListAdd="watchListAdd($event)"
            @watchListRemove="watchListRemove($event)"
            @klineSelect="klineSelect($event)" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.connection-status-bar {
  margin-right: 15px;
}
</style>
