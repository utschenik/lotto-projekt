<template>
  <v-container>
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

    <v-container class="d-flex flex-wrap justify-center">
      <user-tipp v-for="tippIn of usersTipps" :tipp="tippIn" :key="tippIn.id" class="mr-4 mb-4"></user-tipp>
    </v-container>
  </v-container>
</template>

<script>
import UserTipp from '../components/UserTipp.vue'

export default {
  name: 'MyTipps',

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
    this.LOTTO_PLAYER = this.$LOTTO_PLAYER
    this.LOTTO_MANAGER = this.$LOTTO_MANAGER
  },

  data: () => ({
    LOTTO_PLAYER: undefined,
    LOTTO_MANAGER: undefined,
    loading: true,
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarText: undefined
  }),

  methods: {
    async fetchUsersTipps () {
      const result = await this.$store.dispatch('FETCH_USERS_TIPPS', this.$USER_ID)
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
