<script>
export default {
  name: 'app',
  components: {},
  data: () => ({
  }),
}
</script>

<template>
  <v-app>
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
