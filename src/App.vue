<template>
  <v-app>

    <v-app-bar app color="yellow lighten-2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: inherit;">Lotto-Projekt Schulz & Schüler</router-link>
      </v-toolbar-title>

      <v-btn @click="logout" class="ml-auto">
        Logout
        <v-icon
          dark
          right
        >
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>

    <navigation :drawer=drawer></navigation>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer color="yellow lighten-2">
      <v-col
        class="text-right"
        cols="12"
      >
        <span class="font-weight-thin">Hallo, {{ $USERNAME }}</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',

  components: {
    Navigation
  },

  methods: {
    logout () {
      this.$KEYCLOAK.logout()
    }
  },

  data: () => ({
    drawer: false
  })
}
</script>
