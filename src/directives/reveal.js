const observers = new WeakMap();

export const reveal = {
  mounted(element, { arg }) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    element.classList.add('reveal', arg === 'slide' ? 'reveal_slide' : 'reveal_fade');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.add('reveal_visible');
      observer.disconnect();
    });
    observer.observe(element);
    observers.set(element, observer);
  },
  unmounted(element) {
    observers.get(element)?.disconnect();
  },
};
