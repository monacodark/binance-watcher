<script>
import {mapState} from 'vuex'
import Watchlist from '@/components/Watchlist'

export default {
  name: 'container-watchlist',
  components: {
    'watchlist': Watchlist,
  },
  computed: {
    ...mapState([
      'watchlist',
      'tickers',
      'chart',
    ]),
  },
}
</script>

<template>
  <watchlist
    :watchlist="watchlist"
    :tickers="tickers"
    :selectedTicker="chart.ticker"
    @watchlistAdd="$store.dispatch('watchlistAdd', $event)"
    @watchlistRemove="$store.dispatch('watchlistRemove', $event)"
    @chartTickerSet="$store.dispatch('chartTickerSet', $event)" />
</template>
