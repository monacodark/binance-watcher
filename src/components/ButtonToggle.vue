<script>
export default {
  name: 'button-toggle',
  props: {
    pressed: Boolean,
    text: String,
  },
}
</script>

<template>
  <v-btn
    :class="pressed ? '' : 'button-toggle_depressed'"
    :outlined="pressed"
    color="primary"
    small
    @click="$emit('toggle', !pressed)">
    {{ text }}
  </v-btn>
</template>

<style lang="scss">
  .button-toggle_depressed {
    color: #212121 !important;
    border: thin solid;
  }
</style>
