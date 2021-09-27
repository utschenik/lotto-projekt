import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/not-authorized',
    name: 'Unauthorized',
    component: () => import('../views/403.vue')
  },
  {
    path: '/new-tipp',
    name: 'NewTipp',
    component: () => import(/* webpackChunkName: "new-tipp" */ '../views/NewTipp.vue')
  },
  {
    path: '/my-tipps',
    name: 'MyTipps',
    component: () => import(/* webpackChunkName: "my-tipp" */ '../views/MyTipps.vue')
  },
  {
    path: '/draw-winner',
    name: 'DrawWinner',
    component: () => import(/* webpackChunkName: "draw-winner" */ '../views/DrawWinner.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
