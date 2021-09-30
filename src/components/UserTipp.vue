<template>
  <v-card width="500">
    <v-card-title>Tipp vom {{ tipp.date }}</v-card-title>
    <v-card-text v-if="!tipp.isgezogen">Warte auf Ziehung ☹️</v-card-text>
    <v-card-text v-else>
      Tipp wurde ausgewertet 🎉
      <br>
      Richtige Zahlen werden grün eingekreist
    </v-card-text>

    <v-row>
      <v-col class="text-center">
        <v-container class="d-flex" v-for="(value, name) in tipp" :key="name">
          <v-container v-if=showNames(name)>
            <span >{{ dictonary(name) }}:</span>
          </v-container>
          <v-container class="d-flex justify-center" v-if=showNames(name)>
            <div :class="{ 'is-correct-answer':  checkIfNumberOfTippCorrect(name) }">
              <span class="font-weight-bold" :class="{ 'is-correct-answer-number':  checkIfNumberOfTippCorrect(name) }">{{ value }}</span>
            </div>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {

  props: {
    tipp: Object,
    drawsFromUser: Array
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
      const bool = (this.tipp.isgezogen && (name !== 'date' && name !== 'userid' && name !== 'isgezogen' && name !== 'ziehungid')) || (!this.tipp.isgezogen && (name !== 'date' && name !== 'userid' && name !== 'isgezogen' && name !== 'richtige' && name !== 'klasse' && name !== 'ziehungid'))
      return bool
    },
    checkIfNumberOfTippCorrect (key) {
      if (this.drawsFromUser.length === 0 || (key === 'id' || key === 'klasse' || key === 'richtige')) {
        return false
      }

      for (const drawsIn of this.drawsFromUser) {
        if (this.tipp.ziehungid === drawsIn.id) {
          return drawsIn[key] === this.tipp[key]
        }
      }
    }
  }
}
</script>

<style>

.is-correct-answer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #43A047;
}

.is-correct-answer-number {
  color: white;
}

</style>
