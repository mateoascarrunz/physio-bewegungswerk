<script setup>
import BaseButton from '../base/BaseButton.vue';
import { jobs } from '@/services/cms';
</script>

<template>
  <section v-if="jobs.length" id="stellen" class="jobs" aria-labelledby="jobs-title">
    <div class="section-head">
      <h2 id="jobs-title" class="t-h2">Offene Stellen</h2>
    </div>
    <ul v-reveal:assemble class="jobs__list">
      <li v-for="job in jobs" :key="job.id" class="jobs__row">
        <h3 class="t-h3">{{ job.name }}</h3>
        <div class="jobs__actions">
          <BaseButton v-if="job.linkedInLink" variant="secondary" size="sm" icon="linkedin" :href="job.linkedInLink">
            LinkedIn
          </BaseButton>
          <BaseButton v-if="job.pdfLink" size="sm" arrow :href="job.pdfLink">Mehr</BaseButton>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.jobs__list {
  display: grid;
  gap: var(--space-2);
}

.jobs__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3) var(--space-5);
  padding: clamp(1.125rem, 2vw, 1.75rem);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.jobs__row h3 {
  min-width: min(100%, 16rem);
  flex: 1;
  overflow-wrap: anywhere;
}

.jobs__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
