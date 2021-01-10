<script>
export default {
  name: 'intervals',
  props: {
    intervalSelected: String,
  },
  data() {
    return {
      intervals: ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'],
    }
  },
}
</script>

<template>
  <v-btn-toggle>
    <v-btn
      v-for="interval in intervals"
      :key="interval"
      :class="{
        'v-item--active': intervalSelected === interval,
        'v-btn--active': intervalSelected === interval,
      }"
      @click="$emit('intervalSelect', interval)"
      v-html="interval" />
  </v-btn-toggle>
</template>
