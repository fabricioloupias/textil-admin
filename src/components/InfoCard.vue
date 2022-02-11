<template>
  <div>
    <v-card color="#385F73" dark min-height="110">
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>{{ subtitle }}</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "InfoCard",
  props: {
    title: String,
    subtitle: String,
  },
  data: () => ({}),
})
</script>
