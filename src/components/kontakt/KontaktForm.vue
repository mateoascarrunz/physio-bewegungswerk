<script setup>
import { computed, nextTick, reactive, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import { PRACTICE } from '@/content/practice';

// Public EmailJS identifiers: they only allow sending through this template.
const EMAILJS_SERVICE = 'service_bphnx5s';
const EMAILJS_TEMPLATE = 'template_1yau1ec';
const EMAILJS_PUBLIC_KEY = 'JwRQLh9SOb9XYUb-k';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({ name: '', phone: '', email: '', message: '', website: '' });
const errors = reactive({ name: '', email: '', message: '' });
const status = ref('idle'); // idle | sending | success | error
const resultElement = ref(null);

const isSending = computed(() => status.value === 'sending');

function validateField(field) {
  const value = form[field].trim();
  if (field === 'name') errors.name = value ? '' : 'Bitte geben Sie Ihren Namen an.';
  if (field === 'email') {
    if (!value) errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    else errors.email = EMAIL_PATTERN.test(value) ? '' : 'Diese E-Mail-Adresse scheint nicht korrekt zu sein.';
  }
  if (field === 'message') errors.message = value ? '' : 'Bitte schreiben Sie uns Ihre Nachricht.';
}

/** Only re-checks a field once it has been flagged, so typing is not interrupted. */
function clearErrorWhenFixed(field) {
  if (errors[field]) validateField(field);
}

async function focusResult() {
  await nextTick();
  resultElement.value?.focus();
}

async function submit(event) {
  ['name', 'email', 'message'].forEach(validateField);

  const firstInvalid = ['name', 'email', 'message'].find((field) => errors[field]);
  if (firstInvalid) {
    event.target.elements[firstInvalid]?.focus();
    return;
  }

  // Bots fill every field they find; people never see this one.
  if (form.website) {
    status.value = 'success';
    focusResult();
    return;
  }

  status.value = 'sending';
  try {
    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      { name: form.name.trim(), number: form.phone.trim(), email: form.email.trim(), message: form.message.trim() },
      EMAILJS_PUBLIC_KEY,
    );
    status.value = 'success';
    Object.assign(form, { name: '', phone: '', email: '', message: '' });
  } catch {
    status.value = 'error';
  }
  focusResult();
}
</script>

<template>
  <section v-reveal="160" class="contact-form card" aria-labelledby="form-title">
    <template v-if="status === 'success'">
      <div ref="resultElement" class="form-result form-result--success" tabindex="-1" role="status">
        <span class="form-result__icon"><BaseIcon name="check" :size="24" /></span>
        <h2 id="form-title" class="t-h2">Vielen Dank für Ihre Nachricht!</h2>
        <p class="t-body">
          Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden an Werktagen bei Ihnen melden.
        </p>
        <BaseButton variant="secondary" @click="status = 'idle'">Weitere Nachricht schreiben</BaseButton>
      </div>
    </template>

    <template v-else>
      <header class="contact-form__header">
        <h2 id="form-title" class="t-h2">Kontaktieren Sie uns!</h2>
        <p class="t-small">Felder mit * sind erforderlich.</p>
      </header>

      <div
        v-if="status === 'error'"
        ref="resultElement"
        class="form-alert"
        tabindex="-1"
        role="alert"
      >
        <BaseIcon name="alert" :size="20" />
        <p>
          <strong>Es tut uns leid, aber Ihre Nachricht konnte nicht erfolgreich übermittelt werden.</strong>
          Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut. Wenn das Problem weiterhin besteht, können Sie uns
          direkt unter <a :href="PRACTICE.email.href">{{ PRACTICE.email.label }}</a> kontaktieren.
        </p>
      </div>

      <form class="contact-form__fields" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="contact-name">Vor- und Nachname *</label>
          <input
            id="contact-name"
            v-model="form.name"
            name="name"
            type="text"
            autocomplete="name"
            required
            placeholder="Max Mustermann"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            @blur="clearErrorWhenFixed('name')"
            @input="clearErrorWhenFixed('name')"
          />
          <p v-if="errors.name" id="contact-name-error" class="field__error">
            <BaseIcon name="alert" :size="16" />{{ errors.name }}
          </p>
        </div>

        <div class="field">
          <label for="contact-phone">Telefonnummer</label>
          <input
            id="contact-phone"
            v-model="form.phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="+41 22 123 45 67"
          />
        </div>

        <div class="field">
          <label for="contact-email">E-Mail *</label>
          <input
            id="contact-email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            required
            placeholder="max.mustermann@example.com"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            @blur="clearErrorWhenFixed('email')"
            @input="clearErrorWhenFixed('email')"
          />
          <p v-if="errors.email" id="contact-email-error" class="field__error">
            <BaseIcon name="alert" :size="16" />{{ errors.email }}
          </p>
        </div>

        <div class="field field--full">
          <label for="contact-message">Nachricht *</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="5"
            required
            placeholder="Wie können wir Ihnen helfen?"
            :aria-invalid="Boolean(errors.message)"
            :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            @blur="clearErrorWhenFixed('message')"
            @input="clearErrorWhenFixed('message')"
          ></textarea>
          <p v-if="errors.message" id="contact-message-error" class="field__error">
            <BaseIcon name="alert" :size="16" />{{ errors.message }}
          </p>
        </div>

        <div class="field--trap" aria-hidden="true">
          <label for="contact-website">Website</label>
          <input id="contact-website" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div class="contact-form__submit">
          <BaseButton type="submit" variant="accent" arrow :loading="isSending">
            {{ isSending ? 'Wird gesendet…' : 'Senden' }}
          </BaseButton>
        </div>
      </form>
    </template>
  </section>
</template>

<style scoped>
.contact-form {
  display: grid;
  align-content: start;
  gap: var(--space-5);
}

.contact-form__header {
  display: grid;
  gap: var(--space-2);
}

.contact-form__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.field {
  grid-column: span 2;
  display: grid;
  gap: var(--space-2);
  align-content: start;
}

.field label {
  color: var(--blue-950);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  line-height: 1.3;
}

.field input,
.field textarea {
  width: 100%;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: var(--radius-md);
  outline: none;
  background: var(--white);
  box-shadow: inset 0 0 0 1.5px var(--line-field);
  font-size: 1rem;
  line-height: 1.4;
  transition: box-shadow var(--duration-fast) var(--ease-out);
}

.field textarea {
  display: block;
  min-height: 9rem;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-faint);
}

@media (hover: hover) and (pointer: fine) {
  .field input:hover,
  .field textarea:hover {
    box-shadow: inset 0 0 0 1.5px var(--blue-800);
  }
}

.field input:focus,
.field textarea:focus {
  box-shadow:
    inset 0 0 0 2px var(--color-brand),
    0 0 0 4px var(--blue-200);
}

.field [aria-invalid='true'],
.field [aria-invalid='true']:hover {
  box-shadow: inset 0 0 0 2px var(--color-error);
}

.field [aria-invalid='true']:focus {
  box-shadow:
    inset 0 0 0 2px var(--color-error),
    0 0 0 4px var(--magenta-100);
}

.field__error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  color: var(--color-error);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  line-height: 1.4;
}

.field__error svg {
  margin-block-start: 0.125rem;
}

.field--trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.contact-form__submit {
  grid-column: span 2;
  margin-block-start: var(--space-2);
}

.form-alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--magenta-100);
  color: var(--color-error);
  font-size: var(--text-small);
  line-height: 1.5;
}

.form-alert svg {
  margin-block-start: 0.0625rem;
}

.form-alert p {
  color: var(--blue-950);
}

.form-alert strong {
  display: block;
  margin-block-end: var(--space-1);
}

.form-alert a {
  color: inherit;
  text-decoration: underline;
  overflow-wrap: anywhere;
}

.form-result {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding-block: var(--space-6);
  animation: form-result-in var(--duration-slow) var(--ease-out);
}

.form-result__icon {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #dcf3ea;
  color: var(--color-success);
}

@keyframes form-result-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}

@media (min-width: 40rem) {
  .field {
    grid-column: span 1;
  }

  .field:first-child,
  .field--full {
    grid-column: span 2;
  }
}
</style>
