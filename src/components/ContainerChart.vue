<script>
import TradingVue from 'trading-vue-js'
import {mapState} from 'vuex'

export default {
  name: 'container-chart',
  components: {
    'trading-vue': TradingVue,
  },
  data() {
    return {
      width: null,
      height: null,
    }
  },
  computed: {
    kline() {
      return {
        ohlcv: this.chart.kline,
      }
    },
    ...mapState([
      'chart',
      'watchlistVisible',
    ]),
  },
  watch: {
    watchlistVisible() {
      this.width = document.getElementById('container-chart').offsetWidth
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  mounted() {
    this.width = document.getElementById('container-chart').offsetWidth
    this.height = window.innerHeight - 64 - 24 - 14 - 4

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
  <v-card id="container-chart">
    <v-card-title style="height: 7px; padding: 0px;" />

    <v-divider />

    <div class="chart">
      <trading-vue
        :data="kline"
        :width="width"
        :height="height"
        :titleTxt="`${chart.ticker} ${chart.interval}`.toUpperCase()"
        :colorBack="'#212121'"
        :colorTitle="'#F0B90B'"
        :colorGrid="'#424242'"
        :colorCandleUp="'#F0B90B'"
        :colorCandleDw="'#F57C00'"
        :colorWickUp="'#F0B90B'"
        :colorWickDw="'#F57C00'"
        :colorVolUp="'#9C27B0'"
        :colorVolDw="'#7B1FA2'" />

      <div
        class="preloader"
        :class="{preloader_showed: !chart.kline.length}"
        :style="{
          height: height + 'px',
          width: width + 'px',
        }">
        <div class="preloader-wrapper">
          <v-progress-circular
            :size="70"
            indeterminate
            color="amber" />
        </div>
      </div>

      <resize-observer @notify="chartResizeHandler" />
    </div>

    <v-divider />

    <v-card-actions style="height: 7px; padding: 0px;" />
  </v-card>
</template>
<style lang="scss">
  .chart {
    position: relative;
  }

  .preloader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #212121;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    visibility: hidden;
    opacity: 0;
    transition: opacity .5s;
  }

  .preloader_showed {
    visibility: visible;
    opacity: 1;
  }
</style>
