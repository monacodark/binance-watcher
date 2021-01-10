<script>
export default {
  name: 'watchlist-item',
  components: {},
  props: {
    item: Object,
    selectedTicker: String,
  },
  methods: {
    onTickerSelect() {
      this.$emit('chartTickerSet', this.item.ticker)
    },
    onRemove() {
      this.$emit('watchlistRemove', this.item.ticker)
    },
  },
}
</script>

<template>
  <div
    :class="{
      'watchlist-item': true,
      'watchlist-item_selected': item.ticker === selectedTicker,
    }">
    <div
      class="watchlist-item__label"
      @click="onTickerSelect">
      <div class="watchlist-item__ticker">
        {{ item.ticker.toUpperCase() }}
      </div>
      <div class="watchlist-item__price">
        {{ item.price || '----------' }}
      </div>
    </div>
    <div class="watchlist-item__btn-remove-wrapper">
      <v-btn
        class="ticker__btn-remove"
        color="grey lighten-1"
        icon
        @click="onRemove">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
  .watchlist-item {
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
      .watchlist-item__btn-remove-wrapper {
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
