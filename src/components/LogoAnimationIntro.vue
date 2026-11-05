<template>
  <div
    v-if="isVisible"
    class="page_intro"
    :class="{ page_intro_leaving: isLeaving }"
    @click="leave"
    @transitionend.self="isVisible = false"
  >
    <div ref="logoContainer" class="logo"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const SEEN_KEY = 'introSeen';
const PLAYBACK_SPEED = 1.5;
const MAX_DURATION_MS = 4000;
const SKIP_EVENTS = ['wheel', 'touchmove', 'keydown'];

function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Private browsing may block storage; the intro just plays again next visit.
  }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isVisible = ref(!prefersReducedMotion && !readSeen());
const isLeaving = ref(false);
const logoContainer = ref(null);

// Page entrances wait for this class, so they play as the intro lifts.
const INTRO_ACTIVE_CLASS = 'intro-active';
if (isVisible.value) document.documentElement.classList.add(INTRO_ACTIVE_CLASS);

let animation = null;
let safetyTimer = null;

function removeSkipListeners() {
  SKIP_EVENTS.forEach((event) => window.removeEventListener(event, leave));
}

function leave() {
  isLeaving.value = true;
  document.documentElement.classList.remove(INTRO_ACTIVE_CLASS);
  markSeen();
  clearTimeout(safetyTimer);
  removeSkipListeners();
}

onMounted(async () => {
  if (!isVisible.value) return;

  SKIP_EVENTS.forEach((event) => window.addEventListener(event, leave, { passive: true }));
  safetyTimer = setTimeout(leave, MAX_DURATION_MS);

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
  document.documentElement.classList.remove(INTRO_ACTIVE_CLASS);
  clearTimeout(safetyTimer);
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
