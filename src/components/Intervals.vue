<script>
export default {
  name: 'intervals',
  props: {
    intervals: Array,
    intervalSelected: String,
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
