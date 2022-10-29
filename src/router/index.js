import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'logon',
    component: () => import('@/views/logon/')
  }
]

const router = new VueRouter({
  routes
})

export default router
