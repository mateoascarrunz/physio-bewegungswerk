/*
 * Hover effects that rearrange a group of cards should answer a person moving the
 * mouse, not cards scrolling underneath a pointer that stands still. Scrolling
 * lifts the `pointer-intent` class from the root element; a real mouse movement of
 * a few pixels sets it again. Styles that react to hover across a group check for
 * the class; simple hover feedback on a single element does not need to.
 */
const INTENT_CLASS = 'pointer-intent';
const MOVE_THRESHOLD_PX = 6;

let travelled = 0;

function root() {
  return document.documentElement;
}

function onScroll() {
  travelled = 0;
  if (root().classList.contains(INTENT_CLASS)) root().classList.remove(INTENT_CLASS);
}

function onPointerMove(event) {
  if (event.pointerType !== 'mouse' || root().classList.contains(INTENT_CLASS)) return;
  // Browsers re-test hover after a scroll without the pointer moving; such
  // updates carry no movement, so only real travel counts.
  travelled += Math.abs(event.movementX) + Math.abs(event.movementY);
  if (travelled >= MOVE_THRESHOLD_PX) root().classList.add(INTENT_CLASS);
}

export function installPointerIntent() {
  if (typeof window === 'undefined') return;
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
}
