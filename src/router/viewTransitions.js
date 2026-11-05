import { isOverlayEntry, isOverlayOpen } from '@/services/articleOverlay';
import { findArticleBySlug } from '@/services/news';
import { canUseViewTransitions, startViewTransition } from '@/services/viewTransition';

const DIALOG_QUERIES = { team: 'team' };

function articleId(route) {
  return findArticleBySlug(route.params.article)?.id ?? null;
}

function queryValue(route, key) {
  const value = route.query[key];
  return Array.isArray(value) ? value[0] : (value ?? null);
}

/**
 * What a navigation means visually: a page handing over to the next, or a card
 * growing into its dialog or detail page and shrinking back again.
 */
export function describeNavigation(to, from) {
  if (to.path === from.path) {
    for (const [key, kind] of Object.entries(DIALOG_QUERIES)) {
      const before = queryValue(from, key);
      const after = queryValue(to, key);
      if (!before && after) return { type: 'dialog', kind, id: after, from: 'card', to: 'modal', modal: true };
      if (before && !after) return { type: 'dialog', kind, id: before, from: 'modal', to: 'card', modal: true };
    }
    return null;
  }
  if (to.name === 'newsArticle' && from.name === 'news' && isOverlayEntry()) {
    return { type: 'dialog', kind: 'news', id: articleId(to), from: 'card', to: 'modal', modal: true };
  }
  if (from.name === 'newsArticle' && to.name === 'news' && isOverlayOpen()) {
    return { type: 'dialog', kind: 'news', id: articleId(from), from: 'modal', to: 'card', modal: true };
  }
  if (to.name === 'newsArticle') return { type: 'page', kind: 'news', id: articleId(to), from: 'card', to: 'page' };
  if (from.name === 'newsArticle') return { type: 'page', kind: 'news', id: articleId(from), from: 'page', to: 'card' };
  if (to.name === 'behandlungstechnikenitem') {
    return { type: 'page', kind: 'service', id: to.params.serviceid, from: 'card', to: 'page' };
  }
  if (from.name === 'behandlungstechnikenitem') {
    return { type: 'page', kind: 'service', id: from.params.serviceid, from: 'page', to: 'card' };
  }
  return { type: 'page' };
}

export function installViewTransitions(router) {
  if (!canUseViewTransitions()) return;

  let finishNavigation = null;
  router.afterEach(() => {
    finishNavigation?.();
    finishNavigation = null;
  });

  router.beforeResolve(async (to, from) => {
    // The first page appears as it is; only moves within the site transition.
    if (!from.matched.length) return;
    const plan = describeNavigation(to, from);
    if (!plan) return;
    const navigated = new Promise((resolve) => {
      finishNavigation = resolve;
    });
    await startViewTransition(plan, navigated);
  });
}
