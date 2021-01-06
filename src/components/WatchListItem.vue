<script>
export default {
  name: 'watch-item',
  components: {},
  props: {
    data: Object,
    timerId: null,
  },
  data() {
    return {
    }
  },
  methods: {
    clickForTicker() {
      console.log('click', this.data.ticker)
    },
    clickForRemove() {
      this.$store.dispatch('watchListRemove', this.data.ticker)
    },
  },
}
</script>

<template>
  <div
    class="watch-list-item">
    <div
      class="watch-list-item__label"
      @click="clickForTicker">
      <div class="watch-list-item__ticker">
        {{ data.ticker.toUpperCase() }}
      </div>
      <div class="watch-list-item__price">
        {{ data.price || '--------' }}
      </div>
    </div>
    <div class="watch-list-item__btn-remove-wrapper">
      <v-btn
        class="ticker__btn-remove"
        color="ptimary"
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
