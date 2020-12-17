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
      connection: null,
    }
  },
  mounted() {
    // console.log('starting connection')
    // this.connection = new WebSocket('wss://stream.binance.com:9443/stream?streams=bnbbtc@trade')

    // this.connection.onopen = (event) => {
    //   console.log('successfully connection', event)
    // }

    // this.connection.onmessage = (event) => {
    //   // console.log('message', event)
    // }
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

