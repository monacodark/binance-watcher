<script>
import {mapState} from 'vuex'
import AppBar from '@/components/AppBar'

export default {
  name: 'app',
  components: {
    'app-bar': AppBar,
  },
  computed: {
    socketIsConnected() {
      return this.socket.isConnected
    },
    ...mapState([
      'socket',
    ]),
  },
  watch: {
    socketIsConnected(isConnected) {
      if (isConnected) this.$store.dispatch('streamsInitSubscribe')
    },
  },
  async mounted() {
    this.$store.dispatch('appLocalDataInit')
    await this.$store.dispatch('tickersLoad')
    await this.$store.dispatch('chartKlineLoad')
  },
}
</script>

<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <app-bar />

        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  body {
    background: #272727;
  }
</style>
