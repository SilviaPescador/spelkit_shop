import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
// import haveRoleGuard from "./role-guard"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // beforeEnter: [haveRoleGuard],

  },
  {
    path: '/shop',
    name: 'shop',
    // route level code-splitting
    // this generates a separate chunk (shop.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "products" */ '../views/ProductsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/user',
    name: 'user',
     // Lazy loading: no carga los archivos hasta que se visita este path
     component: () =>
     import(/* webpackChunkName: "aboutView" */ "../views/AccountView.vue"),
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
