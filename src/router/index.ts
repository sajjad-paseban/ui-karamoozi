import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LandingRoute from './landing'
import LandingLayout from '@/layout/LandingLayout.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PanelLayout from '@/layout/PanelLayout.vue'
import PanelRoute from './panel'
import auth from '@/middlewares/auth.middleware'
import LogoutViewVue from '@/views/LogoutView.vue'
import userNotLogin from '@/middlewares/userNotLogin.middleware'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LandingLayout,
    children: LandingRoute
  },
  {
    path: '/panel',
    component: PanelLayout,
    children: PanelRoute,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue,
    meta: {
      middleware: [
        userNotLogin
      ]
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutViewVue,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      middleware: [
        userNotLogin
      ]
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

    return (...parameters: any) => {
      // Run the default Vue Router `next()` callback first.
      context.next(...parameters);
      // Then run the subsequent Middleware with a new
      // `nextMiddleware()` callback.
      const nextMiddleware = nextFactory(context, middleware, index + 1);
      subsequentMiddleware({ ...context, next: nextMiddleware });
    };
  }
  
  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
  
      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);
  
      return middleware[0]({ ...context, next: nextMiddleware });
    }
  
    return next();
  });

export default router
