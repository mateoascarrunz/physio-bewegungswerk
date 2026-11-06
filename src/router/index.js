import { createRouter } from 'vue-router';
import { applyPageMeta } from './pageMeta';
import { installViewTransitions } from './viewTransitions';
import { isOverlayEntry, markNavigatedInApp } from '@/services/articleOverlay';
import { articleSlug, findArticle, findArticleBySlug } from '@/services/news';
import { canUseViewTransitions } from '@/services/viewTransition';
import { findService } from '@/content/services';

const PAGE_LEAVE_MS = 120;

// Keeps the address as typed while showing the not found page.
function notFound(to) {
  return { name: 'NotFound', params: { catchAll: to.path.slice(1).split('/') }, query: to.query, hash: to.hash };
}

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Physio Bewegungswerk | Physiotherapie in Gossau ZH',
      description:
        'Physiotherapie in Gossau ZH: von Manueller Therapie und Lymphdrainage bis Rehabilitation und Hausbesuchen. Krankenkassen-anerkannte Praxis an der Bergstrasse 3.',
    },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    meta: {
      title: 'Kontakt | Physio Bewegungswerk in Gossau ZH',
      description:
        'Bergstrasse 3, 8625 Gossau ZH. Bei offenen Fragen sind wir gerne per E-Mail oder telefonisch von Montag bis Freitag von 09:00 bis 17:00 Uhr erreichbar.',
    },
    component: () => import('../views/KontaktView.vue'),
  },
  {
    path: '/behandlungstechniken',
    name: 'behandlungstechniken',
    meta: {
      title: 'Behandlungstechniken | Physio Bewegungswerk in Gossau ZH',
      description:
        'Unser Therapieangebot in Gossau ZH: 14 Behandlungstechniken von Manueller Therapie, Lymphdrainage und Dry Needling bis Atemtherapie und Hausbesuchen.',
    },
    component: () => import('../views/BehandlungstechnikenView.vue'),
  },
  {
    path: '/behandlungstechniken/:serviceid',
    name: 'behandlungstechnikenitem',
    props: true,
    beforeEnter(to) {
      if (!findService(to.params.serviceid)) return notFound(to);
    },
    component: () => import('../views/ServiceDetailView.vue'),
  },
  {
    path: '/uberuns',
    name: 'uberuns',
    meta: {
      title: 'Über uns | Physio Bewegungswerk in Gossau ZH',
      description:
        'Lernen Sie das Team von Physio Bewegungswerk in Gossau ZH kennen: unser Behandlungsansatz, unsere Werte und unsere Praxis an der Bergstrasse 3.',
    },
    component: () => import('../views/UberUnsView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      title: 'News | Physio Bewegungswerk',
      description:
        'Neuigkeiten aus der Praxis Physio Bewegungswerk in Gossau ZH: Einblicke, Veränderungen und Aktuelles aus unserem Team.',
    },
    // Links shared before articles had their own address still arrive at the right one.
    beforeEnter(to) {
      const legacyId = to.query.artikel;
      if (!legacyId) return;
      const article = findArticle(legacyId);
      return article
        ? { name: 'newsArticle', params: { article: articleSlug(article) }, replace: true }
        : { name: 'news', replace: true };
    },
    component: () => import('../views/NachrichtenView.vue'),
  },
  {
    path: '/news/:article',
    name: 'newsArticle',
    props: true,
    beforeEnter(to) {
      const article = findArticleBySlug(to.params.article);
      if (!article) return notFound(to);
      const slug = articleSlug(article);
      if (slug !== to.params.article) return { name: 'newsArticle', params: { article: slug }, query: to.query, replace: true };
    },
    component: () => import('../views/NachrichtenView.vue'),
  },
  {
    path: '/private',
    name: 'private',
    meta: {
      title: 'Physiotherapie – Privat & Krankenkassen anerkannt | Physio Bewegungswerk',
      description:
        'Physiotherapie im Physio Bewegungswerk: Als Krankenkassen-anerkannte Praxis behandeln wir mit ärztlicher Verordnung (Kostenübernahme durch Grundversicherung, IV und MV). Zusätzlich bieten wir Private Physiotherapie ohne Verordnung an – ideal zur Prävention und zum Wohlbefinden. Termine ab CHF 75.–.',
    },
    component: () => import('../views/PrivateView.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    meta: {
      title: 'FAQ | Physio Bewegungswerk',
      description:
        'Antworten zu Terminabsagen und zur Kostenübernahme durch Grundversicherung, IV und MV bei Physio Bewegungswerk in Gossau ZH.',
    },
    component: () => import('../views/FaqView.vue'),
  },
  {
    path: '/datenschutz',
    name: 'datenschutz',
    meta: {
      title: 'Datenschutz | Physio Bewegungswerk',
      description: 'Datenschutzerklärung der Physio Bewegungswerk GmbH, Bergstrasse 3, 8625 Gossau ZH.',
    },
    component: () => import('../views/DatenschutzView.vue'),
  },
  {
    path: '/impressum',
    name: 'impressum',
    meta: {
      title: 'Impressum | Physio Bewegungswerk',
      description: 'Impressum der Physio Bewegungswerk GmbH, Bergstrasse 3, 8625 Gossau ZH, Schweiz.',
    },
    component: () => import('../views/ImpresumView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { title: 'Admin | Physio Bewegungswerk', noindex: true },
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    meta: { title: 'Seite nicht gefunden | Physio Bewegungswerk', noindex: true },
    component: () => import('../views/404View.vue'),
  },
];

function scrollBehavior(to, from, savedPosition) {
  // Opening a dialog only changes the query, so the page must stay where it is.
  if (to.path === from.path) return to.hash ? { el: to.hash } : false;
  // The news grid stays in place while an article opens over it, or the viewer steps to the next one.
  if (to.name === 'newsArticle' && ['news', 'newsArticle'].includes(from.name) && isOverlayEntry()) return false;
  const position = savedPosition ?? (to.hash ? { el: to.hash } : { top: 0 });
  // A view transition captures the old page first, so the scroll can happen at once.
  // The fallback fade has to finish before the old page may jump.
  if (canUseViewTransitions()) return position;
  return new Promise((resolve) => setTimeout(() => resolve(position), PAGE_LEAVE_MS));
}

/** One router per app instance: the browser uses web history, pre-rendering memory history. */
export function createAppRouter(history) {
  const router = createRouter({ history, routes, scrollBehavior });
  router.afterEach((to, from) => {
    if (from.matched.length) markNavigatedInApp();
    applyPageMeta(to);
  });
  installViewTransitions(router);
  return router;
}
