<script>
import WatchList from '@/components/WatchList'
import Chart from '@/components/Chart'

export default {
  name: 'home',
  components: {
    'watch-list': WatchList,
    'chart': Chart,
  },
  data() {
    return {
      // connection: null,
    }
  },
  computed: {
    watchListVisible() {
      return this.$store.getters.watchListVisible
    },
  },
  mounted() {
    this.$store.dispatch('tickerListLoad')
    this.$store.dispatch('localDataInit')
  },
}
</script>

<template>
  <div class="home">
    <v-container :fluid="true">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          :sm="watchListVisible ? '8' : '12'"
          :lg="watchListVisible ? '9' : '12'">
          <chart />
        </v-col>

        <v-col
          v-if="watchListVisible"
          cols="12"
          xs="12"
          sm="4"
          lg="3">
          <watch-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
