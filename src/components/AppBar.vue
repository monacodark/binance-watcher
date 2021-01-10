<script>
import Intervals from '@/components/Intervals'
import ConnectionStatus from '@/components/ConnectionStatus'
import ButtonToggle from '@/components/ButtonToggle'
import {mapState} from 'vuex'

export default {
  name: 'app-bar',
  components: {
    'intervals': Intervals,
    'connection-status': ConnectionStatus,
    'button-toggle': ButtonToggle,
  },
  computed: {
    socketIsConnected() {
      return this.socket.isConnected
    },
    ...mapState([
      'socket',
      'watchlistVisible',
      'chart',
    ]),
  },
}
</script>

<template>
  <div
    class="app-bar"
    app
    color=""
    dark>
    <intervals
      class="intervals"
      :intervalSelected="chart.interval"
      @intervalSelect="$store.dispatch('chartIntervalSet', $event)" />

    <div class="right-wrapper">
      <connection-status
        :status="socket.isConnected" />

      <button-toggle
        :pressed="watchlistVisible"
        :text="'Watchlist'"
        @toggle="$store.dispatch('watchlistVisibleSet', $event)" />
    </div>
  </div>
</template>

<style lang="scss">
.app-bar {
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: #272727;
  padding: 10px 15px;

  display: flex;
  justify-content: space-between;
  width: 100%;

  .intervals {
    background-color: #272727 !important;
    overflow-x: scroll;
  }

  .right-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;

    .app-bar {
      height: 100px !important;
    }

    .right-wrapper {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
  }
}
</style>
