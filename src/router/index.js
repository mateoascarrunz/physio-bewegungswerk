import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kontakt',
      name: 'kontakt',

      component: () => import('../views/KontaktView.vue')
    },
    {
      path: '/dienstleistungen',
      name: 'dienstleistungen',

      component: () => import('../views/DienstleistungenView.vue')
    },
    {
      path: '/uberuns',
      name: 'uberuns',

      component: () => import('../views/UberUnsView.vue')
    },
    {
      path: '/nachrichten',
      name: 'nachrichten',

      component: () => import('../views/NachrichtenView.vue')
    },
    {
      path: '/faq',
      name: 'faq',

      component: () => import('../views/FaqView.vue')
    },
  ]
})

export default router
