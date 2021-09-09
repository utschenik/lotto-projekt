<template>
  <v-card width="500">
    <v-card-title>Tipp vom {{ tipp.date }}</v-card-title>
    <v-card-text v-if="!tipp.isgezogen">Warte auf Ziehung ☹️</v-card-text>
    <v-card-text v-else>Tipp wurde ausgewertet 🎉</v-card-text>

    <v-row>
      <v-col class="text-center">
        <v-container class="d-flex" v-for="(value, name) in tipp" :key="name">
          <v-container v-if=showNames(name)>
            <span >{{ dictonary(name) }}:</span>
          </v-container>
          <v-container v-if=showNames(name)>
            <span class="font-weight-bold">{{ value }}</span>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {

  props: {
    tipp: Object
  },

  methods: {
    dictonary (word) {
      const dict = {
        id: 'Tipp-ID',
        number1: 'Erste Zahl',
        number2: 'Zweite Zahl',
        number3: 'Dritte Zahl',
        number4: 'Vierte Zahl',
        number5: 'Fünfte Zahl',
        number6: 'Sechste Zahl',
        superzahl: 'Super Zahl',
        klasse: 'Gewinnklasse',
        richtige: 'Anzahl richtiger Zahlen'
      }

      return dict[word]
    },
    showNames (name) {
      const bool = (this.tipp.isgezogen && (name !== 'date' && name !== 'userid' && name !== 'isgezogen')) || (!this.tipp.isgezogen && (name !== 'date' && name !== 'userid' && name !== 'isgezogen' && name !== 'richtige' && name !== 'klasse'))
      return bool
    }
  }
}
</script>

<style>

</style>
