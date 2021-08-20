import Vue from 'vue'
import Keycloak from 'keycloak-js'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const initOptions = {
  url: 'http://127.0.0.1:3004/auth', realm: 'vue-realm', clientId: 'vue-app', onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions)

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload()
  } else {
    console.log('Authenticated')

    Vue.prototype.$KEYCLOAK = keycloak

    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app')
  }

  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed.')
      } else {
        console.warn('Token not refreshed, but valid.')
      }
    }).catch(() => {
      console.log('Failed to refresh token')
    })
  }, 6000)
}).catch(() => {
  console.error('Error happend')
})
