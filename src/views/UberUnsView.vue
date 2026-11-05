<script setup>
import { computed, watch } from 'vue';
import UberunsHero from '@/components/uberuns/UberunsHero.vue';
import UberunsTeam from '@/components/uberuns/UberunsTeam.vue';
import UberunsStandort from '@/components/uberuns/UberunsStandort.vue';
import UberunsCompany from '@/components/uberuns/UberunsCompany.vue';
import UberunsExpertises from '@/components/uberuns/UberunsExpertises.vue';
import UberunsStellen from '@/components/uberuns/UberunsStellen.vue';
import TeamModal from '@/components/uberuns/TeamModal.vue';
import { useQueryModal } from '@/composables/useQueryModal';
import { teams } from '@/services/cms';

const { value: memberId, close } = useQueryModal('team');

const member = computed(() => teams.find((entry) => String(entry.id) === memberId.value) ?? null);

// A shared link can point at someone who has since left the team.
watch(
  [memberId, member],
  ([id, found]) => {
    if (id && !found) close();
  },
  { immediate: true },
);
</script>

<template>
  <div class="page shell">
    <UberunsHero />
    <UberunsTeam class="section" />
    <UberunsStandort class="section" />
    <UberunsCompany class="section" />
    <UberunsExpertises class="section" />
    <UberunsStellen class="section" />
    <TeamModal :member="member" @close="close" />
  </div>
</template>
