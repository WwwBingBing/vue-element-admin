import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/Layout'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    hidder: true,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
