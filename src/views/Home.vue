<script>
import ContainerWatchlist from '@/components/ContainerWatchlist'
import ContainerChart from '@/components/ContainerChart'
import {mapState} from 'vuex'

export default {
  name: 'home',
  components: {
    'container-watchlist': ContainerWatchlist,
    'container-chart': ContainerChart,
  },
  computed: {
    ...mapState([
      'watchlistVisible',
    ]),
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
          :sm="watchlistVisible ? '8' : '12'"
          :lg="watchlistVisible ? '9' : '12'">
          <container-chart />
        </v-col>

        <v-col
          v-if="watchlistVisible"
          cols="12"
          xs="12"
          sm="4"
          lg="3">
          <container-watchlist />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.connection-status-bar {
  margin-right: 15px;
}
</style>
