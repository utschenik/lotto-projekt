<template>
  <v-container fill-height class="text-center">
    <v-snackbar color="blue" v-model="snackbar" :timeout="snackbarTimeout">
      <span class="font-weight-bold">{{ snackbarText }}</span>
    </v-snackbar>

    <v-progress-circular
      class="mx-auto"
      indeterminate
      color="amber"
      v-if="!loading"
      :size="70"
      :width="7"
    ></v-progress-circular>

    <v-container class="flex-column">
      <user-tipp v-for="tipps of usersTipps" :key="tipps.id" class="mb-4"></user-tipp>
    </v-container>
  </v-container>
</template>

<script>
import UserTipp from '../components/UserTipp.vue'

export default {
  name: 'Dashboard',

  components: {
    UserTipp
  },

  computed: {
    usersTipps () {
      return this.$store.getters.GET_USERS_TIPPS
    }
  },

  created () {
    this.fetchUsersTipps()
  },

  data: () => ({
    loading: false,
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarText: undefined
  }),

  methods: {
    async fetchUsersTipps () {
      const result = await this.$store.dispatch('FETCH_USERS_TIPPS', this.$USER_ID)
      this.loading = true
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
