<template>
  <v-container class="justify-center" fill-height>
    <v-icon x-large class="mr-6">mdi-account-alert</v-icon>
    <h2>403 - Du darfst diese Seite nicht sehen</h2>

    <v-container class="text-center">
      <v-btn color="blue" class="mb-8 mt-4" @click="backToDashboard">
        Zurück zum Dashboard
        <v-icon dark right>mdi-arrow-left</v-icon>
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'Unauthorized',

  methods: {
    backToDashboard () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
