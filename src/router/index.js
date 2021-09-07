import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/store/auth.module.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && !auth.state.status.loggedIn) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
