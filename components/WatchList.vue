<script>
import WatchItem from '@/components/WatchItem'

export default {
  name: 'watch-list',
  components: {
    'watch-item': WatchItem,
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
      <v-btn
        icon
        class="btn-hide">
        <v-icon
          color="grey lighten-1"
          v-text="'mdi-eye-off'" />
      </v-btn>

      Watchlist

      <v-spacer />

      <v-btn icon>
        <v-icon
          color="grey lighten-1"
          v-text="'mdi-plus'" />
      </v-btn>
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
  .btn-hide {
    margin-right: 15px;
  }
  .table-wrapper {
    padding: 10px;
  }
</style>
