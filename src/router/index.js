import { createRouter, createWebHistory } from 'vue-router'
import { applyPageMeta } from './pageMeta'
import { installViewTransitions } from './viewTransitions'
import { canUseViewTransitions } from '@/services/viewTransition'

// Keeps the address as typed while showing the not found page.
function notFound(to) {
  return { name: 'NotFound', params: { catchAll: to.path.slice(1).split('/') }, query: to.query, hash: to.hash }
}

const PAGE_LEAVE_MS = 120

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: "Physio Bewegungswerk in Gossau",description: "Bleib beweglich. Vom Traum zur Realität: Unsere eigene Praxis - Eine Reise von 10 Jahren Zusammenarbeit"},
      component: () => import('../views/HomeView.vue'),

    },
    {
      path: '/kontakt',
      name: 'kontakt',
      meta: {title: "Kontakt - Physio Bewegungswerk",description: "Bergstrasse 3, 8625 Gossau. Bei offenen Fragen sind wir gerne per E-Mail oder telefonisch von Montag bis Freitag von 09:00 bis 17:00 Uhr erreichbar."},

      component: () => import('../views/KontaktView.vue'),

    },
    {
      path: '/behandlungstechniken',
      name: 'behandlungstechniken',
      meta: {title: "Therapieangebot - Physio Bewegungswerk",description: "Herzlich willkommen beim Physio Bewegungswerk. Wir freuen uns, Ihnen nicht nur therapeutische Dienstleistungen anzubieten, sondern Ihnen bei der Verbesserung Ihrer Lebensqualität zu helfen. Unser Team steht Ihnen zur Verfügung, um Sie auf Ihrem Weg zu begleiten und die bestmögliche Betreuung zu gewährleisten. Unsere Ansätze und Techniken umfassen eine breite Palette bewährter Methoden, da jeder Mensch einzigartige Beschwerden, Bedürfnisse und Ziele hat. Wir passen unsere Herangehensweise an, um Ihre individuellen Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen."},
      component: () => import('../views/BehandlungstechnikenView.vue'),
    },
    {
      path: '/behandlungstechniken/:serviceid',
      name: 'behandlungstechnikenitem',
      props: true,
      async beforeEnter(to) {
        const { findService } = await import('../content/services.js')
        if (!findService(to.params.serviceid)) return notFound(to)
      },
      meta: { title: 'Therapieangebot - Physio Bewegungswerk', description: "Herzlich willkommen beim Physio Bewegungswerk. Wir freuen uns, Ihnen nicht nur therapeutische Dienstleistungen anzubieten, sondern Ihnen bei der Verbesserung Ihrer Lebensqualität zu helfen. Unser Team steht Ihnen zur Verfügung, um Sie auf Ihrem Weg zu begleiten und die bestmögliche Betreuung zu gewährleisten. Unsere Ansätze und Techniken umfassen eine breite Palette bewährter Methoden, da jeder Mensch einzigartige Beschwerden, Bedürfnisse und Ziele hat. Wir passen unsere Herangehensweise an, um Ihre individuellen Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen." },
      component: () => import('../views/ServiceDetailView.vue'),

    },

    {
      path: '/uberuns',
      name: 'uberuns',
      meta: {title: "Über uns - Physio Bewegungswerk",description: "In unserer Praxis betrachten wir jeden Patienten als einzigartiges Individuum. Unser Therapieansatz ist flexibel. Wir entwickeln individuelle Behandlungspläne, die auf die spezifischen Bedürfnisse und Ziele jedes Patienten zugeschnitten sind. Wir arbeiten eng mit unseren Patienten zusammen, um gemeinsam Strategien zu gestalten/entwerfen, die darauf abzielen, die gewünschten Ergebnisse zu erreichen."},

      component: () => import('../views/UberUnsView.vue'),

    },
    {
      path: '/news',
      name: 'news',
      meta: {title: "News - Physio Bewegungswerk",description: "Bleibe auf dem neuesten Stand in der Welt der Physiotherapie. Unsere News-Sektion bietet aktuelle Informationen, Forschungsergebnisse und Expertenmeinungen rund um physiotherapeutische Methoden, Gesundheitstipps und inspirierende Geschichten von Patienten. Entdecke die neuesten Entwicklungen und praktischen Ratschläge, um deine Gesundheit und Lebensqualität zu verbessern."},

      component: () => import('../views/NachrichtenView.vue'),
   
    },
        {
      path: '/private',
      name: 'private',
      meta: {title: "Physiotherapie – Privat & Krankenkassen anerkannt | Physio Bewegungswerk",description: "Physiotherapie im Physio Bewegungswerk: Als Krankenkassen-anerkannte Praxis behandeln wir mit ärztlicher Verordnung (Kostenübernahme durch Grundversicherung, IV und MV). Zusätzlich bieten wir Private Physiotherapie ohne Verordnung an – ideal zur Prävention und zum Wohlbefinden. Termine ab CHF 75.–."},

      component: () => import('../views/PrivateView.vue'),
   
    },
    {
      path: '/faq',
      name: 'faq',
      meta: {title: "FAQ - Physio Bewegungswerk"},

      component: () => import('../views/FaqView.vue'),
 
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      meta: {title: "Datenschutz - Physio Bewegungswerk"},

      component: () => import('../views/DatenschutzView.vue'),
 
    },
    {
      path: '/impressum',
      name: 'impressum',
      meta: {title: "Impressum - Physio Bewegungswerk"},

      component: () => import('../views/ImpresumView.vue'),
 
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { title: 'Admin - Physio Bewegungswerk', noindex: true },

      component: () => import('../views/AdminView.vue'),
    },
    { 
      path: '/:catchAll(.*)*', 
      name: 'NotFound',
      meta: { title: 'Seite nicht gefunden - Physio Bewegungswerk', noindex: true },
      component: () => import('../views/404View.vue')

    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Opening a modal only changes the query, so the page must stay where it is.
    if (to.path === from.path) return to.hash ? { el: to.hash } : false;
    const position = savedPosition ?? (to.hash ? { el: to.hash } : { top: 0 });
    // A view transition captures the old page first, so the scroll can happen at once.
    // The fallback fade has to finish before the old page may jump.
    if (canUseViewTransitions()) return position;
    return new Promise((resolve) => setTimeout(() => resolve(position), PAGE_LEAVE_MS));
  },
})



router.afterEach(applyPageMeta)
installViewTransitions(router)

export default router
