<script>
export default {
  name: 'watchlist-add',
  props: {
    tickers: Array,
    watchlist: Array,
  },
  data() {
    return {
      dialog: false,
      timerId: null,
      selectedValue: '',
      searchValue: '',
      inputSearchValue: '',
      listSize: 6,
    }
  },
  computed: {
    tickersFiltered() {
      return this.tickers
          .filter((ticker) => {
            if (
              ticker.ticker.indexOf(this.searchValue.toLowerCase()) > -1
            ) return ticker

            return false
          })
          .filter((ticker) => {
            return !this.watchlist.find((_ticker) => {
              return ticker.ticker === _ticker.ticker
            })
          })
    },
    tickersCropped() {
      return this.tickersFiltered.slice(0, this.listSize)
    },
  },
  methods: {
    refresh() {
      this.selectedValue = ''
      this.searchValue = ''
      this.inputSearchValue = ''
    },
    openDialog() {
      this.refresh()
      this.dialog = true
    },
    onAdd() {
      this.$emit('watchlistAdd', this.selectedValue)
      this.dialog = false

      this.refresh()
    },
    onInputSearch(e) {
      clearTimeout(this.timerId)

      this.timerId = setTimeout(
          async () => {
            this.searchValue = e
            this.selectedValue = ''
          },
          500,
      )
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        @click="openDialog">
        <v-icon
          color="grey lighten-1"
          v-text="'mdi-plus'" />
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="inputSearchValue"
          label="Search"
          class="search-input"
          :autofocus="true"
          filled
          @input="onInputSearch" />
      </v-card-title>

      <v-divider />

      <v-card-text
        class="dialog-body">
        <v-radio-group
          v-model="selectedValue"
          class="ticker-list"
          column>
          <v-radio
            v-for="item in tickersCropped"
            :key="item.ticker"
            class="ticker-item"
            :label="item.ticker.toUpperCase()"
            :value="item.ticker" />
        </v-radio-group>
        <div
          v-if="tickersFiltered.length > listSize">
          ..and {{ tickersFiltered.length - listSize }} items
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          :disabled="!selectedValue"
          @click="onAdd"
          v-text="'Continue'" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.search-input {
  .v-text-field__details {
    display: none;
  }
}

.dialog-body {
  height: 300px;
  padding-top: 0px !important;
  padding-bottom: 0 !important;
}

.ticker-list {
  margin-top: 0px;
}
</style>
