import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LandingRoute from './landing'
import LandingLayout from '@/layout/LandingLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LandingLayout,
    children: LandingRoute
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
