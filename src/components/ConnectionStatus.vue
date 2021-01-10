<script>
export default {
  name: 'connection-status',
  props: {
    status: Boolean,
  },
}
</script>

<template>
  <div class="connection-status-bar">
    <v-icon
      v-if="status"
      color="green"
      v-text="'mdi-check-all'" />

    <v-icon
      v-else
      color="blue"
      v-text="'mdi-timer-sand-empty'" />
  </div>
</template>
