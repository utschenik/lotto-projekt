<template>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-if=LOTTO_PLAYER>
            <v-list-item-title>
              <router-link to="/new-tipp">Neuer Tipp</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if=LOTTO_PLAYER>
            <v-list-item-title>
              <router-link to="/my-tipps">Meine Tipps</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if=LOTTO_MANAGER>
            <v-list-item-title>
              <router-link to="/draw-winner">Gewinn Ziehung erstellen</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navigation',

  props: {
    drawer: Boolean
  },

  created () {
    this.LOTTO_PLAYER = this.$LOTTO_PLAYER
    this.LOTTO_MANAGER = this.$LOTTO_MANAGER
  },

  data: () => ({
    LOTTO_PLAYER: undefined,
    LOTTO_MANAGER: undefined
  })
}
</script>
