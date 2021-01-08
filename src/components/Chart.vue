<script>
import TradingVue from 'trading-vue-js'

export default {
  name: 'chart',
  components: {
    'trading-vue': TradingVue,
  },
  props: {
    chartKline: Array,
    klineSelected: String,
    intervalSelected: String,
  },
  data() {
    return {
      width: null,
      height: null,
      $chart: null,
    }
  },
  computed: {
    chart() {
      return {
        ohlcv: this.chartKline,
      }
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  mounted() {
    this.width = document.getElementById('chart').offsetWidth
    this.height = window.innerHeight - 64 - 24 - 20

    window.addEventListener('resize', this.windowResizeHandler)
  },
  methods: {
    chartResizeHandler({width, height}) {
      this.width = width
    },
    windowResizeHandler(e) {
      this.height = e.target.innerHeight - 64 - 24 - 14 - 4
    },
  },
}
</script>

<template>
  <v-card id="chart">
    <v-card-title style="height: 7px; padding: 0px;" />
    <v-divider />
    <div>
      <trading-vue
        :data="chart"
        :width="width"
        :height="height"
        :titleTxt="`${klineSelected} ${intervalSelected}`.toUpperCase()"
        :colorBack="'#212121'"
        :colorTitle="'#F0B90B'"
        :colorGrid="'#424242'"
        :colorCandleUp="'#F0B90B'"
        :colorCandleDw="'#F57C00'"
        :colorWickUp="'#F0B90B'"
        :colorWickDw="'#F57C00'"
        :colorVolUp="'#9C27B0'"
        :colorVolDw="'#7B1FA2'" />
      <resize-observer @notify="chartResizeHandler" />
    </div>
    <v-divider />
    <v-card-actions style="height: 7px; padding: 0px;" />
  </v-card>
</template>
