<script>
import TradingVue from 'trading-vue-js'

export default {
  name: 'chart',
  components: {
    'trading-vue': TradingVue,
  },
  data() {
    return {
      chart: {
        ohlcv: [
          [1551128400000, 33, 37.1, 14, 14, 196],
          [1551132000000, 13.7, 30, 6.6, 30, 206],
          [1551135600000, 50.9, 35, 21.3, 21.8, 74],
          [1551139200000, 21.7, 25.9, 18, 24, 140],
          [1551142800000, 24.1, 24.1, 24, 24.1, 29],
        ],
      },
    }
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      Title
    </v-card-title>

    <v-divider />

    <v-card-text>
      <trading-vue :data="chart" />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      lol
    </v-card-actions>
  </v-card>
</template>
