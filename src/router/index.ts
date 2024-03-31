import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LandingRoute from './landing'
import LandingLayout from '@/layout/LandingLayout.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LandingLayout,
    children: LandingRoute
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
