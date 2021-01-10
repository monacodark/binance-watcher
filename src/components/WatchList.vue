<script>
import WatchlistItem from '@/components/WatchlistItem'
import WatchlistAdd from '@/components/WatchlistAdd'

export default {
  name: 'watchlist',
  components: {
    'watchlist-item': WatchlistItem,
    'watchlist-add': WatchlistAdd,
  },
  props: {
    watchlist: Array,
    tickers: Array,
    selectedTicker: String,
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      Watchlist

      <v-spacer />

      <watchlist-add
        :tickers="tickers"
        :watchlist="watchlist"
        @watchlistAdd="$emit('watchlistAdd', $event)" />
    </v-card-title>

    <v-divider />

    <ul
      v-if="watchlist.length"
      class="watchlist">
      <watchlist-item
        v-for="item in watchlist"
        :key="item.ticker"
        :item="item"
        :selectedTicker="selectedTicker"
        @chartTickerSet="$emit('chartTickerSet', $event)"
        @watchlistRemove="$emit('watchlistRemove', $event)" />
    </ul>
    <div
      v-else
      class="no-items">
      Empty list
    </div>
  </v-card>
</template>

<style lang="scss">
  .watchlist {
    padding-left: 0px !important;
  }

  .no-items {
    padding: 15px;
    color: #616161;
    font-size: 12px;
  }
</style>
