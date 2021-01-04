<script>
import WatchListItem from '@/components/WatchListItem'
import WatchListAdd from '@/components/WatchListAdd'

export default {
  name: 'watch-list',
  components: {
    'watch-list-item': WatchListItem,
    'watch-list-add': WatchListAdd,
  },
  data() {
    return {
      selectedItem: 0,
    }
  },
  computed: {
    watchList() {
      return this.$store.getters.watchList
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      Watchlist

      <v-spacer />

      <watch-list-add />
    </v-card-title>

    <v-divider />

    <ul
      v-if="watchList.length"
      class="watch-list">
      <watch-list-item
        v-for="item in watchList"
        :key="item.ticker"
        :data="item" />
    </ul>
    <div
      v-else
      class="no-items">
      Empty list
    </div>
  </v-card>
</template>

<style lang="scss">
  .watch-list {
    padding-left: 0px !important;
  }

  .no-items {
    padding: 15px;
    color: #616161;
    font-size: 12px;
  }
</style>
