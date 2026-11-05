import { nextTick, reactive } from 'vue';

const NAVIGATION_TIMEOUT_MS = 1000;
const MODAL_TIMEOUT_MS = 400;

/**
 * Which element carries the shared view-transition names right now. A card,
 * a dialog or a detail page only names itself while it is the holder, so each
 * name exists exactly once in the old and in the new state.
 */
export const sharedElement = reactive({ kind: null, id: null, holder: null });

export function isSharedHolder(kind, id, holder) {
  return sharedElement.kind === kind && sharedElement.holder === holder && String(sharedElement.id) === String(id);
}

export function sharedStyle(kind, id, holder, name) {
  return isSharedHolder(kind, id, holder) ? { viewTransitionName: name } : undefined;
}

let running = null;
const modalEvents = new EventTarget();

export function canUseViewTransitions() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function isViewTransitionRunning() {
  return running !== null;
}

/** Dialogs report when they have opened or closed, so a transition can capture the finished state. */
export function notifyModalSettled() {
  modalEvents.dispatchEvent(new Event('settled'));
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function modalSettled() {
  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer);
      modalEvents.removeEventListener('settled', done);
      resolve();
    };
    const timer = setTimeout(done, MODAL_TIMEOUT_MS);
    modalEvents.addEventListener('settled', done, { once: true });
  });
}

/**
 * Runs one navigation inside a view transition. Resolves once the old state is
 * captured, which is when the router may carry on; `navigated` resolves when it
 * has. Timers rather than animation frames are used for waiting, because the
 * browser pauses rendering while the update runs.
 */
export async function startViewTransition(plan, navigated) {
  running?.skipTransition();
  Object.assign(sharedElement, { kind: plan.kind ?? null, id: plan.id ?? null, holder: plan.from ?? null });
  document.documentElement.dataset.transition = plan.type;
  await nextTick();

  return new Promise((proceed) => {
    const transition = document.startViewTransition(async () => {
      proceed();
      await Promise.race([navigated, wait(NAVIGATION_TIMEOUT_MS)]);
      sharedElement.holder = plan.to ?? null;
      await nextTick();
      if (plan.modal) await modalSettled();
      await wait(0);
    });
    running = transition;
    transition.finished.finally(() => {
      if (running !== transition) return;
      running = null;
      Object.assign(sharedElement, { kind: null, id: null, holder: null });
      delete document.documentElement.dataset.transition;
    });
  });
}
