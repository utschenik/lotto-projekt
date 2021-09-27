<template>
  <v-container class="d-flex flex-nowrap" fill-height>
    <v-snackbar color="blue" v-model="snackbar" :timeout="snackbarTimeout">
      <span class="font-weight-bold">{{ snackbarText }}</span>
    </v-snackbar>
    <v-container>
      <v-row>
        <v-col
          v-for="(value, name) in tipp"
          :key="name"
        >
        <number-tipp
          @emit-number-click="saveNewNumber"
          :numberTipp="name"
          :selected="value"
          :isDisabled="isNumberFieldDisabled"
        ></number-tipp>
        </v-col>

        <v-container class="d-flex justify-end">
          <v-btn color="red" @click="deleteTipp" v-if="!isNumberFieldDisabled">
            Auswahl löschen
            <v-icon dark right>mdi-delete</v-icon>
          </v-btn>

          <v-btn color="blue" class="ml-4" v-if="!isNumberFieldDisabled" :disabled=allTipsDone @click="dispatchNewTipp">
            Akzeptieren
            <v-icon dark right>mdi-check</v-icon>
          </v-btn>

          <v-btn color="blue" class="ml-4" v-if="isNumberFieldDisabled" @click="startNewTipp">
            Neuen Tipp machen
            <v-icon dark right>mdi-autorenew</v-icon>
          </v-btn>
        </v-container>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-container fluid class="text-center">
          <h1 v-if="sendedTipp">Dein letzter Tipp 🎉</h1>
          <h1 v-else>Mache einen Tipp 🪄</h1>
        </v-container>
        <v-col class="text-center">
          <v-container class="d-flex" v-for="(value, name) in sendedTipp" :key="name">
            <v-container v-if="name != 'userID'">
              <span >{{ dictonary(name) }}:</span>
            </v-container>
            <v-container v-if="name != 'userID'">
              <span class="font-weight-bold">{{ value }}</span>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import NumberTipp from '../components/NumberTipp.vue'

export default {
  beforeMount () {
    if (!this.$LOTTO_PLAYER) {
      this.$router.push({ path: '/not-authorized' })
    }
  },

  components: { NumberTipp },
  name: 'NewTipp',

  computed: {
    allTipsDone () {
      return this.numbersClicked !== 6
    },

    sendedTipp () {
      return this.$store.getters.GET_TIPP
    },

    isNumberFieldDisabled () {
      return !!this.$store.getters.GET_TIPP
    }
  },

  methods: {
    deleteTipp () {
      this.numbersClicked = 0
      for (const value in this.tipp) {
        this.tipp[value] = false
      }
    },

    startNewTipp () {
      this.$store.commit('SET_TIPP', undefined)
    },

    dictonary (word) {
      const dict = {
        number1: 'Erste Zahl',
        number2: 'Zweite Zahl',
        number3: 'Dritte Zahl',
        number4: 'Vierte Zahl',
        number5: 'Fünfte Zahl',
        number6: 'Sechste Zahl',
        superZahl: 'Super Zahl'
      }

      return dict[word]
    },

    saveNewNumber (number, selected) {
      if (this.numbersClicked >= 6 && !selected) {
        return
      }

      if (!selected) {
        this.numbersClicked = this.numbersClicked + 1
      } else {
        this.numbersClicked = this.numbersClicked - 1
      }

      this.tipp[number] = !selected
    },

    async dispatchNewTipp () {
      const result = await this.$store.dispatch('NEW_TIPP', { tipp: this.tipp, userID: this.$KEYCLOAK.idTokenParsed.sub })
      this.showSnackbar(result)
      this.deleteTipp()
    },

    showSnackbar (isShown) {
      if (isShown) {
        this.snackbarText = 'Succesful operation 🚀'
      } else {
        this.snackbarText = 'Something bad happend 💥'
      }

      this.snackbar = true
    }
  },

  data: () => ({
    tipp: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false,
      19: false,
      20: false,
      21: false,
      22: false,
      23: false,
      24: false,
      25: false,
      26: false,
      27: false,
      28: false,
      29: false,
      30: false,
      31: false,
      32: false,
      33: false,
      34: false,
      35: false,
      36: false,
      37: false,
      38: false,
      39: false,
      40: false,
      41: false,
      42: false,
      43: false,
      44: false,
      45: false,
      46: false,
      47: false,
      48: false,
      49: false
    },
    numbersClicked: 0,
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarText: undefined
  })
}
</script>
