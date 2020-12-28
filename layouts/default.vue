<script>
export default {
  name: 'app',
  components: {},
  data: () => ({
  }),
  computed: {
    watchlistVisible() {
      return this.$store.getters.watchlistVisible
    },
  },
  methods: {
    toogleWatchlistVisible() {
      this.$store.dispatch('setWatchlistVisible', !this.watchlistVisible)
    },
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

      <!-- <v-progress-circular
        :size="30"
        color="primary"
        indeterminate /> -->

      <v-btn
        :class="watchlistVisible ? '' : 'watchlist-btn_depressed'"
        :outlined="watchlistVisible"
        color="primary"
        small
        @click="toogleWatchlistVisible">
        Watchlist
      </v-btn>
    </v-app-bar>

    <div class="main-wrapper">
      <nuxt />
    </div>
  </v-app>
</template>

<style lang="scss">
  .main-wrapper {
    padding-top: 75px;
  }

  .watchlist-btn_depressed {
    color: #212121 !important;
    border: thin solid;
  }
</style>
