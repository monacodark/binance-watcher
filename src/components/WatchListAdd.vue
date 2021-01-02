<script>
import VirtualList from 'vue-virtual-scroll-list'
import WatchListAddItem from './WatchListAddItem'

export default {
  name: 'watch-list-add',
  components: {
    'virtual-list': VirtualList,
  },
  data() {
    return {
      item: WatchListAddItem,
      dialog: false,
      timerId: null,
      selectValue: '',
      searchValue: '',
      inputSearchValue: '',
    }
  },
  computed: {
    tickerList() {
      return this.$store.getters.tickerList
          .filter((ticker) => {
            if (
              ticker.ticker.indexOf(this.searchValue.toLowerCase()) > -1
            ) return ticker

            return false
          })
          .filter((ticker) => {
            return !this.$store.getters.watchList.find((_ticker) => {
              return ticker.ticker === _ticker.ticker
            })
          })
    },
  },
  methods: {
    refresh() {
      this.selectValue = ''
      this.searchValue = ''
      this.inputSearchValue = ''
    },
    openDialog() {
      this.refresh()
      this.dialog = true
    },
    onAdd() {
      this.$store.dispatch('watchListAdd', this.selectValue)
      this.dialog = false

      this.refresh()
    },
    onInputSearch(e) {
      clearTimeout(this.timerId)

      this.timerId = setTimeout(
          async () => {
            this.searchValue = e
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
        @click="openDialog">
        <v-icon
          color="grey lighten-1"
          v-bind="attrs"
          v-on="on"
          v-text="'mdi-plus'" />
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="inputSearchValue"
          label="Search"
          class="search-input"
          filled
          @input="onInputSearch" />
      </v-card-title>

      <v-divider />

      <v-card-text
        style="height: 300px; padding: 0px;">
        <v-radio-group
          v-model="selectValue"
          style="margin-top: 0px"
          column>
          <virtual-list
            style="height: 300px; overflow-y: auto;"
            :data-key="'ticker'"
            :data-sources="tickerList"
            :data-component="item" />
        </v-radio-group>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          :disabled="!selectValue"
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
</style>
