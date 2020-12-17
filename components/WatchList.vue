<script>
import WatchItem from '@/components/WatchItem'
import WatchListAdd from '@/components/WatchListAdd'

export default {
  name: 'watch-list',
  components: {
    'watch-item': WatchItem,
    'watch-list-add': WatchListAdd,
  },
  data() {
    return {
      selectedItem: 0,
    }
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

    <div class="table-wrapper">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <watch-item />
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-card>
</template>

<style lang="scss">
  .table-wrapper {
    padding: 10px;
  }
</style>
