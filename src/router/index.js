import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/store/modules/auth.module.js'
import routes from './routes'

Vue.use(VueRouter)


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
