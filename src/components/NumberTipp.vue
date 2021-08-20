<template>
  <v-card
    @click="emitClickedNumber(numberTipp, selected);"
    style="cursor: pointer;"
    class="d-flex justify-center pa-4"
    width="50px"
    height="50px"
    hover
    v-bind:class="{ 'number-tipp-card--active': selected }"
  >
    <span>{{ numberTipp }}</span>
  </v-card>
</template>

<script>

export default {
  name: 'NumberTipp',

  props: {
    numberTipp: String,
    selected: Boolean
  },

  methods: {
    emitClickedNumber (number, selected) {
      this.$emit('emit-number-click', number, selected)
    }
  }
}
</script>

<style>
  .number-tipp-card--active {
    background-color: #FFF176!important;
  }
</style>
