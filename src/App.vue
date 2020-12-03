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

      <v-spacer></v-spacer>

    </v-app-bar>

    <div class="main-wrapper">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
  .main-wrapper {
    padding-top: 75px;
  }
</style>
