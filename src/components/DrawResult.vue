<template>
  <v-card width="500">
    <v-card-title>Ziehung vom {{ draw.date }}</v-card-title>
    <v-card-text>Das sind die gezogenen Zahlen</v-card-text>

    <v-row>
      <v-col class="text-center">
        <v-container class="d-flex" v-for="(value, name) in draw" :key="name">
          <v-container v-if="name != 'date'">
            <span >{{ dictonary(name) }}:</span>
          </v-container>
          <v-container v-if="name != 'date'">
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
    draw: Object
  },

  methods: {
    dictonary (word) {
      const dict = {
        id: 'Ziehungs-ID',
        number1: 'Erste Zahl',
        number2: 'Zweite Zahl',
        number3: 'Dritte Zahl',
        number4: 'Vierte Zahl',
        number5: 'Fünfte Zahl',
        number6: 'Sechste Zahl',
        superzahl: 'Super Zahl'
      }

      return dict[word]
    }
  }
}
</script>

<style>

</style>
