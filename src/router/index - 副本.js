import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login/login.vue'
import Home2 from '../views/home/home'
// import material from '../views/material'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }, {
      path: 'comment',
      // component: () => import('../views/comment')
      component: () => import('../views/comment')// 按需加载
    },
    {
      path: 'material', // 素材列表
      component: () => import('../views/material') // 按需加载
      // component: material
    }
    ]
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
