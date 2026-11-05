<script setup>
const CMS_ADMIN_URL = 'https://data.physio-bewegungswerk.ch/admin/';

window.location.replace(CMS_ADMIN_URL);
</script>

<template>
  <div class="page shell">
    <div class="admin-redirect" role="status">
      <span class="admin-redirect__spinner" aria-hidden="true"></span>
      <p class="t-h3">Das Admin-Dashboard wird umgeleitet.</p>
    </div>
  </div>
</template>

<style scoped>
.admin-redirect {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: var(--space-5);
  min-height: 60vh;
  text-align: center;
}

.admin-redirect__spinner {
  width: 2.75rem;
  height: 2.75rem;
  border: 3px solid var(--blue-200);
  border-inline-end-color: var(--color-brand);
  border-radius: 50%;
  animation: admin-spin 0.8s linear infinite;
}

@keyframes admin-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
