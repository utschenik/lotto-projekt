<template>
  <v-container fill-height class="justify-center text-center">
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

    <statistics style="width: 700px;" v-if="chartLoaded" :chartdata="statisticsData" :options="options"></statistics>
  </v-container>
</template>

<script>
import Statistics from '../components/Statistics.vue'
export default {
  name: 'Dashboard',

  components: {
    Statistics
  },

  computed: {
    statistics () {
      return this.$store.getters.GET_STATISTICS
    }
  },

  created () {
    this.fetchStatistics()
  },

  data: () => ({
    loading: true,
    snackbar: false,
    chartLoaded: false,
    statisticsData: null,
    options: null,
    snackbarTimeout: 2000,
    snackbarText: undefined
  }),

  methods: {
    async fetchStatistics () {
      const result = await this.$store.dispatch('FETCH_STATISTICS')
      this.loading = false
      this.showSnackbar(result)

      const labels = []
      const data = []
      const backgroundColor = []
      const borderColor = []

      if (result) {
        for (let i = 0; i <= 49; i++) {
          labels.push(i)
        }

        for (const [key, value] of Object.entries(this.statistics)) {
          console.log(key)
          data.push(value)
          const rgba = this.randomRGBA()
          backgroundColor.push(rgba)
          borderColor.push(rgba)
        }

        this.statisticsData = {
          labels,
          datasets: [{
            label: 'Häufigkeit der Lotto-Zahlen',
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1
          }]
        }

        this.chartLoaded = true
      }
    },

    randomRGBA () {
      const o = Math.round; const r = Math.random; const s = 255
      return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
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
