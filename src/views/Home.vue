<template>
  <div class='home'>
    <v-container>
      <v-row>
        <v-col
          cols='12'
          xs='12'
          sm='8'
          md='8'>
          <v-card>
            <v-card-title>
              Title
            </v-card-title>

            <v-divider />

            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sapiente. Iure delectus suscipit soluta natus omnis sint tempore eveniet? Non nostrum, ratione distinctio sunt accusamus neque vel repellat ipsa placeat?
            </v-card-text>

            <v-divider />

            <v-card-actions>
              lol
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          cols='12'
          xs='12'
          sm='4'
          md='4'>
          <v-card>
            <v-card-title>
              Watchlist

              <v-spacer />

              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-plus</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider />

            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Ticker
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr @click="clickForTicker">
                      <td>BTCUSDT</td>
                      <td class="text-right">
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-information</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      selectedItem: 0
    }
  },
  methods: {
    clickForTicker () {
      console.log('click')
    }
  }
}
</script>
