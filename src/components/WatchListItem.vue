<script>
export default {
  name: 'watch-item',
  components: {},
  props: {
    item: Object,
    klineSelected: String,
  },
  data() {
    return {
    }
  },
  methods: {
    clickForTicker() {
      this.$emit('klineSelect', this.item.ticker)
    },
    clickForRemove() {
      this.$emit('watchListRemove', this.item.ticker)
    },
  },
}
</script>

<template>
  <div
    :class="{
      'watch-list-item': true,
      'watch-list-item_selected': item.ticker === klineSelected,
    }">
    <div
      class="watch-list-item__label"
      @click="clickForTicker">
      <div class="watch-list-item__ticker">
        {{ item.ticker.toUpperCase() }}
      </div>
      <div class="watch-list-item__price">
        {{ item.price || '--------' }}
      </div>
    </div>
    <div class="watch-list-item__btn-remove-wrapper">
      <v-btn
        class="ticker__btn-remove"
        color="grey lighten-1"
        icon
        @click="clickForRemove">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
  .watch-list-item {
    position: relative;
    border-bottom: 1px solid #424242;

    &_selected {
      color: #F0B90B;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #F0B90B;
      .watch-list-item__btn-remove-wrapper {
        opacity: 1;
      }
    }

    &__label {
      cursor: pointer;
      padding: 15px 65px 15px 15px;
      display: flex;
      justify-content: space-between;
    }

    &__btn-remove-wrapper {
      position: absolute;
      top: 9px;
      right: 15px;

      opacity: 0;
      transition: opacity .3s ease;
    }
  }
</style>
