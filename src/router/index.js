import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
    children: [{
      path: 'home',
      component: () => import('@/views/home/home.vue'),
    },{
      path: 'cmpMng',
      component: () => import('@/views/cmpMng/cmpMng.vue'),
      meta:{
        title:'企业管理'
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
