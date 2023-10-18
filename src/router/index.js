import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

    },
    {
      path: '/kontakt',
      name: 'kontakt',

      component: () => import('../views/KontaktView.vue'),

    },
    {
      path: '/behandlungstechniken',
      name: 'behandlungstechniken',
      component: () => import('../views/BehandlungstechnikenView.vue'),
    },
    {
      path: '/behandlungstechniken/:serviceid',
      name: 'behandlungstechnikenitem',
      component: () => import('../views/BehandlungstechnikenView.vue'),

    },

    {
      path: '/uberuns',
      name: 'uberuns',

      component: () => import('../views/UberUnsView.vue'),

    },
    {
      path: '/news',
      name: 'news',

      component: () => import('../views/NachrichtenView.vue'),
   
    },
    {
      path: '/faq',
      name: 'faq',

      component: () => import('../views/FaqView.vue'),
 
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',

      component: () => import('../views/DatenschutzView.vue'),
 
    },
    {
      path: '/impressum',
      name: 'impressum',

      component: () => import('../views/ImpresumView.vue'),
 
    },
    {
      path: '/admin',
      name: 'admin',

      component: () => import('../views/AdminView.vue'),
    },
    { 
      path: '/:catchAll(.*)', 
      name: 'NotFound',
      component: () => import('../views/404View.vue')

    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  
})



export default router
