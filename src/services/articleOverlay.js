/*
 * An article opened from the news grid shows as a dialog over the grid, while
 * the address becomes the article's own page. The same address loaded directly,
 * shared or reloaded is the full article page, which is what gets pre-rendered,
 * so the first page of a visit never opens as an overlay.
 */
let pending = false;
let open = false;
let navigatedInApp = false;

export function markNavigatedInApp() {
  navigatedInApp = true;
  pending = false;
}

/** Called right before the grid pushes an article. */
export function requestOverlay() {
  pending = true;
}

/** Whether the article being entered belongs over the grid: a fresh click, or history returning to one. */
export function isOverlayEntry() {
  if (pending) return true;
  return navigatedInApp && typeof window !== 'undefined' && window.history.state?.overlay === true;
}

export function setOverlayOpen(value) {
  open = value;
}

export function isOverlayOpen() {
  return open;
}
