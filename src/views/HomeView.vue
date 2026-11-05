<script setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import TheHero from '@/components/home/TheHero.vue';
import HomeStory from '@/components/home/HomeStory.vue';
import HomeServices from '@/components/home/HomeServices.vue';
import HomeNews from '@/components/home/HomeNews.vue';
import HomeModules from '@/components/home/HomeModules.vue';
import PartnersBox from '@/components/home/PartnersBox.vue';
import ActionBox from '@/components/home/ActionBox.vue';
import TeamModal from '@/components/uberuns/TeamModal.vue';
import { useQueryModal } from '@/composables/useQueryModal';
import { teams } from '@/services/cms';

const router = useRouter();
const { value: memberId, open, close } = useQueryModal('team');

const member = computed(() => teams.find((entry) => String(entry.id) === memberId.value) ?? null);

function selectPerson(name) {
  const entry = teams.find((candidate) => candidate.name.trim() === name);
  if (entry) open(entry.id);
  else router.push('/uberuns');
}

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
  <div class="page">
    <div class="shell">
      <TheHero @select-person="selectPerson" />
      <HomeStory class="section--tight" />
      <HomeServices class="section" />
      <HomeNews class="section" />
      <PartnersBox class="section" />
      <HomeModules class="section" />
      <ActionBox class="section--tight" />
    </div>
    <TeamModal :member="member" @close="close" />
  </div>
</template>
