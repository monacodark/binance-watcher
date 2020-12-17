<script>
// @ is an alias to /src

export default {
  name: 'watch-item',
  components: {},
  methods: {
    clickForTicker(e) {
      console.log('click', e)
    },
    clickForRemove() {
      console.log('remove')
    },
  },
}
</script>

<template>
  <tr
    class="ticker">
    <td
      class="ticker__label"
      @click="clickForTicker">
      BTCUSDT
      19300
    </td>
    <td
      class="text-right">
      <v-btn
        color="ptimary"
        icon
        @click="clickForRemove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<style lang="scss">
  .ticker {
    cursor: pointer;
  }

  .ticker__label {
    transition: color .3s ease;

    &:hover {
      color: #F0B90B;
    }
  }

  .ticker__btn-remove {
    z-index: 100;
  }
</style>
