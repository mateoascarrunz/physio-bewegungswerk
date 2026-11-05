const PATTERNS = {
  rise: 'reveal--rise',
  mask: 'reveal--mask',
  title: 'reveal--title',
  assemble: 'reveal--assemble',
  expand: 'reveal--expand',
};
const STORY_MS = 900;
const STAGGER_MS = 70;
const SETTLE_MS = 600;

const observers = new WeakMap();
const timers = new WeakMap();

// While a server-rendered page is taking over, anything already on screen stays put:
// hiding it to animate it back in would only make visible content flicker.
let isHydrating = false;

export function setHydrating(value) {
  isHydrating = value;
}

function isOnScreen(element) {
  const { top, bottom } = element.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight;
}

function release(element, children) {
  element.classList.remove('reveal', 'reveal_visible', ...Object.values(PATTERNS));
  element.style.removeProperty('--reveal-delay');
  children.forEach((child) => child.style.removeProperty('--reveal-index'));
}

/**
 * Reveals an element as it reaches the viewport.
 * v-reveal (rise), v-reveal:mask (photos), v-reveal:title (headings),
 * v-reveal:assemble (a composition whose children arrive in turn),
 * v-reveal:expand (a banner opening out from its centre).
 * The value is an extra delay in milliseconds.
 */
export const reveal = {
  mounted(element, { arg = 'rise', value }) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    if (isHydrating && isOnScreen(element)) return;

    const delay = Number(value) || 0;
    const children = arg === 'assemble' ? [...element.children] : [];
    children.forEach((child, index) => child.style.setProperty('--reveal-index', index));
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    element.classList.add('reveal', PATTERNS[arg] ?? PATTERNS.rise);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        element.classList.add('reveal_visible');
        const duration = STORY_MS + delay + children.length * STAGGER_MS + SETTLE_MS;
        timers.set(element, setTimeout(() => release(element, children), duration));
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(element);
    observers.set(element, observer);
  },
  unmounted(element) {
    observers.get(element)?.disconnect();
    clearTimeout(timers.get(element));
  },
};
