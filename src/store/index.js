import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'

Vue.use(Vuex)

const BASE_URL = 'http://localhost:3000/'

export default new Vuex.Store({
  state: {
    tipp: undefined,
    usersTipps: undefined,
    draws: undefined
  },
  getters: {
    GET_TIPP (state) {
      return state.tipp
    },
    GET_USERS_TIPPS (state) {
      return state.usersTipps
    },
    GET_DRAWS (state) {
      return state.draws
    }
  },
  mutations: {
    SET_TIPP (state, payload) {
      state.tipp = payload
    },
    SET_USERS_TIPPS (state, payload) {
      state.usersTipps = payload
    },
    SET_DRAWS (state, payload) {
      state.draws = payload
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

      const resp = await axios.post(BASE_URL + 'tipps', reqBody)
      if (resp.status === 201) {
        commit('SET_TIPP', reqBody)
        return true
      } else {
        return false
      }
    },
    async FETCH_USERS_TIPPS ({ commit }, userId) {
      const resp = await axios.get(BASE_URL + 'tipps/' + userId)
      if (resp.status === 200) {
        commit('SET_USERS_TIPPS', resp.data)
        return true
      } else {
        return false
      }
    },
    async FETCH_DRAWS ({ commit }) {
      const resp = await axios.get(BASE_URL + 'ziehungen')
      if (resp.status === 200) {
        commit('SET_DRAWS', resp.data)
        return true
      } else {
        return false
      }
    },
    async DRAW_WINNER ({ commit }) {
      const today = new Date()
      const reqBody = {
        date: today.toISOString().split('T')[0]
      }

      const resp = await axios.post(BASE_URL + 'ziehung', reqBody)

      if (resp.status === 201) {
        return true
      } else {
        return false
      }
    }
  },
  modules: {
  }
})
