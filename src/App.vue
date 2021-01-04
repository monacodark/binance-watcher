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

      <v-btn
        :class="watchlistVisible ? '' : 'watchlist-btn_depressed'"
        :outlined="watchlistVisible"
        color="primary"
        small
        @click="toogleWatchlistVisible">
        Watchlist
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="main-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  .watchlist-btn_depressed {
    color: #212121 !important;
    border: thin solid;
  }

  body {
    background: #272727;
  }
</style>
