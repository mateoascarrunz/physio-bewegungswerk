<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
</script>

<template>
  <div class="page shell">
    <div class="faq bento">
      <header class="faq__intro">
        <p class="t-label">Häufige Fragen</p>
        <h1 class="t-h1">FAQ</h1>
        <div class="faq__help card card--blue">
          <h2 class="t-h3">Noch Fragen?</h2>
          <BaseButton size="sm" arrow to="/kontakt">Kontakt</BaseButton>
        </div>
      </header>

      <div class="faq__list">
        <details class="disclosure faq__item" open>
          <summary>
            <h2>Versäumte oder nicht rechtzeitig abgesagte Termine</h2>
            <BaseIcon class="disclosure__icon" name="plus" :size="22" />
          </summary>
          <div class="prose faq__answer">
            <p>
              Wir haben Verständnis dafür, dass Patienten in Ausnahmefällen einen Termin verschieben oder absagen müssen. Aus
              Rücksicht auf andere Patienten und auf Ihre Therapeutin gilt beim Physio Bewegungswerk in solchen Fällen
              folgende Regelung:
            </p>
            <ul>
              <li>
                Bitte teilen Sie uns <strong>möglichst frühzeitig</strong> telefonisch oder via E-Mail mit, falls Sie einen
                vereinbarten Termin nicht wahrnehmen können.
              </li>
              <li>
                Termine, die vom Patienten <strong>weniger als 24 Stunden</strong> im Voraus abgesagt oder verschoben werden,
                werden in Rechnung gestellt.
              </li>
              <li>
                Mitteilungen betreffend abzusagende oder zu verschiebende Termine sind auch an Sonn- und Feiertagen möglich
                (wenn die Praxis geschlossen hat). Hinterlassen sie uns dabei gern eine Nachricht auf dem TB oder schicken Sie
                eine E-Mail. Vorausgesetzt, die Mitteilung trifft nachweislich
                <strong>mindestens 24 Stunden vor dem vereinbarten Termin</strong> bei uns ein, werden keine Kosten in
                Rechnung gestellt.
              </li>
            </ul>
            <p>
              Wir bitten Sie bei ansteckenden Erkrankungen oder Fieber zum Schutz anderer Patienten und der Therapeuten Ihren
              Termin abzusagen. Dabei sind wir einmalig kulant mit der Nicht-Verrechnung des Termins auch innerhalb der 24h
              Frist. Bei leichten Grippesymptomen würden wir Sie bitten, eine Hygienemaske zu tragen.
            </p>
          </div>
        </details>

        <details class="disclosure faq__item">
          <summary>
            <h2>Wird die Physiotherapie von der Krankenkasse übernommen?</h2>
            <BaseIcon class="disclosure__icon" name="plus" :size="22" />
          </summary>
          <div class="prose faq__answer">
            <p>
              Unsere Praxis ist von den Krankenkassen anerkannt. Mit einer ärztlichen Verordnung können Sie die Physiotherapie
              bei uns in Anspruch nehmen – die Kosten werden von der Grundversicherung, der Invalidenversicherung (IV) sowie
              der Militärversicherung (MV) übernommen.
            </p>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq {
  row-gap: var(--space-6);
}

.faq__intro {
  grid-column: span 12;
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-block-start: clamp(1rem, 3vw, 2.5rem);
}

.faq__help {
  display: none;
}

.faq__list {
  grid-column: span 12;
}

.faq__item > summary {
  min-height: 4.5rem;
  padding-block: var(--space-4);
}

.faq__item > summary h2 {
  color: inherit;
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: -0.014em;
  text-wrap: balance;
}

.faq__answer {
  padding-block-end: var(--space-6);
}

@media (min-width: 60rem) {
  .faq__intro {
    position: sticky;
    top: calc(var(--header-h) + var(--header-offset) + var(--space-3));
    grid-column: span 4;
    align-self: start;
  }

  .faq__help {
    display: grid;
    justify-items: start;
    gap: var(--space-3);
    margin-block-start: var(--space-5);
    padding: clamp(1.25rem, 2vw, 1.75rem);
  }

  .faq__list {
    grid-column: 5 / span 8;
    padding-block-start: clamp(1rem, 3vw, 2.5rem);
  }
}
</style>
