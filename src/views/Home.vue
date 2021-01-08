<script>
import WatchList from '@/components/WatchList'
import Chart from '@/components/Chart'
import AppBar from '@/components/AppBar'
import {mapState} from 'vuex'

export default {
  name: 'home',
  components: {
    'watch-list': WatchList,
    'chart': Chart,
    'app-bar': AppBar,
  },
  computed: {
    socketIsConnected() {
      return this.$store.getters.socket.isConnected
    },
    ...mapState([
      'watchList',
      'watchListVisible',
      'tickerList',
      'klineSelected',
      'chartKline',
      'intervalSelected',
    ]),
  },
  watch: {
    socketIsConnected(isConnected) {
      if (isConnected) this.$store.dispatch('streamsInitSubscribe')
    },
  },
  mounted() {
    this.$store.dispatch('localDataInit')
    this.$store.dispatch('tickerListLoad')
  },
}
</script>

<template>
  <div class="home">
    <app-bar
      :socketIsConnected="socketIsConnected"
      :watchListVisible="watchListVisible"
      :intervalSelected="intervalSelected"
      @toogleVisible="$store.dispatch('watchListVisibleSet', $event)"
      @intervalSelect="$store.dispatch('intervalSelect', $event)" />

    <v-container :fluid="true">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          :sm="watchListVisible ? '8' : '12'"
          :lg="watchListVisible ? '9' : '12'">
          <chart
            :chartKline="chartKline"
            :intervalSelected="intervalSelected"
            :klineSelected="klineSelected" />
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
            @watchListAdd="$store.dispatch('watchListAdd', $event)"
            @watchListRemove="$store.dispatch('watchListRemove', $event)"
            @klineSelect="$store.dispatch('klineSelect', $event)" />
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
