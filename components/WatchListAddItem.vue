<script>
export default {
  name: 'watch-list-add-item',
  props: {
    source: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<template>
  <v-radio
    class="ticker-item"
    :label="source.ticker.toUpperCase()"
    :value="source.ticker" />
</template>

<style lang="scss">
.ticker-item {
  padding: 8px 22px;
}
</style>
