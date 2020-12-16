<script>
import WatchList from '@/components/WatchList'
import Chart from '@/components/Chart'

export default {
  name: 'home',
  components: {
    'watch-list': WatchList,
    'chart': Chart,
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
          sm="8">
          <chart />
        </v-col>

        <v-col
          cols="12"
          xs="12"
          sm="4">
          <watch-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
