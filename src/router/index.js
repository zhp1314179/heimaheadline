import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { // 主页
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    component: Login

  }

]

const router = new VueRouter({
  routes
})

export default router
