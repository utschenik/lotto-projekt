import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tipp: undefined
  },
  getters: {
    GET_TIPP (state) {
      return state.tipp
    }
  },
  mutations: {
    SET_TIPP (state, payload) {
      state.tipp = payload
    }
  },
  actions: {
    async NEW_TIPP ({ commit }, payload) {
      const numbers = _.keys(_.pickBy(payload.tipp))

      if (numbers.length < 6) {
        return false
      }

      const reqBody = {
        userID: payload.userId,
        number1: numbers[0],
        number2: numbers[1],
        number3: numbers[2],
        number4: numbers[3],
        number5: numbers[4],
        number6: numbers[5],
        superZahl: _.random(0, 9)
      }

      const resp = await axios.post('http://localhost:3000/tipps', reqBody)
      if (resp.status === 201) {
        commit('SET_TIPP', reqBody)
        return true
      } else {
        return false
      }
    }
  },
  modules: {
  }
})
