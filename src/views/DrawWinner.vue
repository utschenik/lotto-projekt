<template>
  <v-container class="justify-center" fill-height>
    <v-snackbar color="blue" v-model="snackbar" :timeout="snackbarTimeout">
      <span class="font-weight-bold">{{ snackbarText }}</span>
    </v-snackbar>

    <v-progress-circular
      class="mx-auto"
      indeterminate
      color="amber"
      v-if="loading"
      :size="70"
      :width="7"
    ></v-progress-circular>

    <v-btn color="blue" v-if="!loading" @click="dispatchDrawWinner" class="mb-8 mt-4">
      Neue Ziehung erstellen
      <v-icon dark right>mdi-check</v-icon>
    </v-btn>

    <v-container class="d-flex flex-wrap justify-center">
      <draw-result v-for="drawIn of draws" :key="drawIn.id" class="mr-4 mb-4" :draw=drawIn>
        {{drawIn.superzahl}}
      </draw-result>
    </v-container>
  </v-container>
</template>

<script>
import DrawResult from '../components/DrawResult.vue'
export default {
  name: 'DrawWinner',

  components: {
    DrawResult
  },

  computed: {
    draws () {
      return this.$store.getters.GET_DRAWS
    }
  },

  data: () => ({
    loading: true,
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarText: undefined
  }),

  created () {
    this.fetchDraws()
  },

  methods: {
    async dispatchDrawWinner () {
      const result = await this.$store.dispatch('DRAW_WINNER')
      this.showSnackbar(result)
    },
    async fetchDraws () {
      const result = await this.$store.dispatch('FETCH_DRAWS')
      this.loading = false
      this.showSnackbar(result)
    },
    showSnackbar (isShown) {
      if (isShown) {
        this.snackbarText = 'Succesful operation 🚀'
      } else {
        this.snackbarText = 'Something bad happend 💥'
      }

      this.snackbar = true
    }
  }
}
</script>

<style>

</style>
