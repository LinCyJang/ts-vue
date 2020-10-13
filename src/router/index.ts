import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
// import particle from '@/components/public/particles.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/particl',
    name: 'particl',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/public/particles.vue')
  },
  {
    path: '/example/particles',
    name: 'particles',
    component: () => import(/* webpackChunkName: "about" */ '@/example/particles.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/ejct',
    name: 'ejct',
    component: () => import('@/components/public/ejct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
