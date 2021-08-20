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
          <v-list-item>
            <v-list-item-title>
              <router-link to="/new-tipp">Neuer Tipp</router-link>
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
  }
}
</script>
