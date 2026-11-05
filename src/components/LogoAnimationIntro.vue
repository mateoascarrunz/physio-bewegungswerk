<template>
  <div
    v-if="isVisible"
    class="page_intro"
    :class="{ page_intro_leaving: isLeaving }"
    @click="leave"
    @transitionend.self="remove"
  >
    <div ref="logoContainer" class="logo"></div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const SEEN_KEY = 'introSeen';
// Added by the inline script in index.html before the first paint, so the page
// never shows before the intro covers it. Entrances start when it is removed.
const PENDING_CLASS = 'intro-pending';
const PLAYBACK_SPEED = 1.5;
const MAX_DURATION_MS = 4000;
const SKIP_EVENTS = ['wheel', 'touchmove', 'keydown'];
// Slightly longer than the fade. If the fade never ran, for example because the
// player failed before the first paint, no transitionend arrives to remove it.
const REMOVE_AFTER_MS = 600;

const isVisible = ref(false);
const isLeaving = ref(false);
const logoContainer = ref(null);

let animation = null;
let safetyTimer = null;
let removeTimer = null;

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Private browsing may block storage; the intro just plays again next visit.
  }
}

function removeSkipListeners() {
  SKIP_EVENTS.forEach((event) => window.removeEventListener(event, leave));
}

function remove() {
  isVisible.value = false;
}

function leave() {
  if (isLeaving.value) return;
  isLeaving.value = true;
  document.documentElement.classList.remove(PENDING_CLASS);
  markSeen();
  clearTimeout(safetyTimer);
  removeSkipListeners();
  removeTimer = setTimeout(remove, REMOVE_AFTER_MS);
}

onMounted(async () => {
  if (!document.documentElement.classList.contains(PENDING_CLASS)) return;

  isVisible.value = true;
  SKIP_EVENTS.forEach((event) => window.addEventListener(event, leave, { passive: true }));
  safetyTimer = setTimeout(leave, MAX_DURATION_MS);
  await nextTick();

  try {
    const [{ default: lottie }, { default: animationData }] = await Promise.all([
      import('lottie-web/build/player/lottie_light'),
      import('@/assets/images/logo-intro.json'),
    ]);
    if (isLeaving.value) return;
    animation = lottie.loadAnimation({
      container: logoContainer.value,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData,
    });
    animation.setSpeed(PLAYBACK_SPEED);
    animation.addEventListener('complete', leave);
  } catch {
    leave();
  }
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove(PENDING_CLASS);
  clearTimeout(safetyTimer);
  clearTimeout(removeTimer);
  removeSkipListeners();
  animation?.destroy();
});
</script>

<style scoped>
.page_intro {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  place-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  transition: opacity var(--duration-slow) var(--ease-out);
}
.page_intro_leaving {
  opacity: 0;
  pointer-events: none;
}
.logo {
  width: 30vw;
  min-width: 200px;
  max-width: 400px;
}
</style>
