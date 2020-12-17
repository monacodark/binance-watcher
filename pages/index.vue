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
    watchlistVisible() {
      return this.$store.getters.watchlistVisible
    },
  },
}
</script>


<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          :sm="watchlistVisible ? '8' : '12'">
          <chart />
        </v-col>

        <v-col
          v-if="watchlistVisible"
          cols="12"
          xs="12"
          sm="4">
          <watch-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

