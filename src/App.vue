<script>
export default {
  name: 'app',
  components: {},
  data: () => ({
  }),
  computed: {
    watchListVisible() {
      return this.$store.getters.watchListVisible
    },
  },
  methods: {
    watchListVisibleToogle() {
      this.$store.dispatch('watchListVisibleSet', !this.watchListVisible)
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
        :class="watchListVisible ? '' : 'watchlist-btn_depressed'"
        :outlined="watchListVisible"
        color="primary"
        small
        @click="watchListVisibleToogle">
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
