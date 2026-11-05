<script setup>
import BaseIcon from '../base/BaseIcon.vue';
import { cardImageUrl, cmsSrcset, teams } from '@/services/cms';
import { sharedStyle } from '@/services/viewTransition';
</script>

<template>
  <section v-if="teams.length" class="team attention" aria-labelledby="team-title">
    <div class="team__intro card card--blue">
      <h2 id="team-title" v-reveal:title class="t-h2">Lernen Sie unser Team kennen</h2>
      <p class="t-body">Wählen Sie eine Person, um mehr über ihre Ausbildung und ihre Spezialgebiete zu erfahren.</p>
    </div>
    <RouterLink
      v-for="(member, index) in teams"
      :key="member.id"
      v-reveal="(index % 3) * 60"
      class="team-card zoom-trigger attention__item"
      :to="{ query: { team: member.id } }"
    >
      <span class="team-card__media zoom-media" :style="sharedStyle('team', member.id, 'card', 'shared-media')">
        <img
          :src="cardImageUrl(member.profilePicture.url)"
          :srcset="cmsSrcset(member.profilePicture.url)"
          sizes="(max-width: 40rem) 47vw, (max-width: 60rem) 47vw, 31vw"
          :alt="member.name.trim()"
          :width="member.profilePicture.width"
          :height="member.profilePicture.height"
          loading="lazy"
          decoding="async"
        />
      </span>
      <div class="team-card__caption">
        <div class="team-card__text">
          <h3 class="team-card__name">{{ member.name.trim() }}</h3>
          <p class="team-card__role">{{ member.workPosition }}</p>
        </div>
        <span class="team-card__arrow"><BaseIcon name="arrow-right" :size="18" /></span>
      </div>
    </RouterLink>
  </section>
</template>

<style scoped>
.team {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 2.2vw, 2rem) var(--gap);
}

.team__intro {
  grid-column: 1 / -1;
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.team__intro .t-body {
  color: var(--blue-950);
}

.team-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-lg);
  -webkit-tap-highlight-color: transparent;
}

.team-card__media {
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.team-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 15%;
}

.team-card__caption {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

.team-card__text {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
}

.team-card__name {
  color: var(--blue-950);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: -0.014em;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.team-card__role {
  color: var(--color-text-soft);
  font-size: var(--text-small);
}

.team-card__arrow {
  display: none;
  place-items: center;
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--blue-100);
  color: var(--blue-700);
  transition:
    background-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
}

.team-card__arrow svg {
  transition: transform var(--duration-base) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .team-card:hover .team-card__arrow {
    background: var(--color-brand);
    color: var(--white);
  }

  .team-card:hover .team-card__arrow svg {
    transform: translateX(2px);
  }

  .team-card:hover .team-card__name {
    color: var(--blue-700);
  }
}

/* An odd person out on two columns gets the full row and a wider crop. */
.team-card:last-child:nth-child(even) {
  grid-column: 1 / -1;
}

.team-card:last-child:nth-child(even) .team-card__media {
  aspect-ratio: 16 / 10;
}

@media (min-width: 30rem) {
  .team-card__arrow {
    display: grid;
  }
}

@media (min-width: 60rem) {
  .team {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .team__intro {
    grid-column: span 1;
  }

  .team-card:last-child:nth-child(even) {
    grid-column: auto;
  }

  .team-card:last-child:nth-child(even) .team-card__media {
    aspect-ratio: 4 / 5;
  }
}
</style>
