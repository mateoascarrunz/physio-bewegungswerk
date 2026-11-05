const observers = new WeakMap();
const CLEANUP_AFTER_MS = 1200;

/**
 * Fades an element in as it reaches the viewport. Elements are only hidden
 * after the observer exists, so content stays visible if this never runs.
 * Usage: v-reveal, or v-reveal="120" for a stagger delay in milliseconds.
 */
export const reveal = {
  mounted(element, { value }) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    if (value) element.style.setProperty('--reveal-delay', `${value}ms`);
    element.classList.add('reveal');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        element.classList.add('reveal_visible');
        // Hand the element back so its own hover transforms and transitions apply.
        setTimeout(() => {
          element.classList.remove('reveal', 'reveal_visible');
          element.style.removeProperty('--reveal-delay');
        }, CLEANUP_AFTER_MS + (value ?? 0));
      },
      { rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(element);
    observers.set(element, observer);
  },
  unmounted(element) {
    observers.get(element)?.disconnect();
  },
};
