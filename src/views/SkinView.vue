<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSkinStore } from '@/stores/skinStore';
import { storeToRefs } from 'pinia';

const skinStore = useSkinStore();
const { lastImageUrl, isLoading, error } = storeToRefs(skinStore);

const prompt = ref('');
const maxLength = 100;

const remainingChars = computed(() => maxLength - prompt.value.length);
const limitInfo = computed(() => skinStore.checkLimit());
const canGenerate = computed(() => 
  prompt.value.trim().length > 0 && 
  !isLoading.value && 
  limitInfo.value.can
);

const handleGenerate = async () => {
  if (!canGenerate.value) return;
  await skinStore.generateSkin(prompt.value);
};
</script>

<template>
  <div class="skin-view container">
    <header class="skin-header">
      <h1 class="title">Create Your Skin</h1>
      <p class="subtitle">Generate a unique anime-style avatar with AI</p>
    </header>

    <main class="skin-content">
      <div class="card creation-card">
        <div class="input-section">
          <label for="avatar-prompt" class="input-label">Describe your avatar</label>
          <div class="input-wrapper">
            <textarea
              id="avatar-prompt"
              v-model="prompt"
              :maxlength="maxLength"
              class="prompt-input"
              placeholder="Ex: blue eyes, samurai armor, neon city background..."
            ></textarea>
            <span :class="['char-counter', { 'text-primary': remainingChars === 0 }]">
              {{ remainingChars }} characters left
            </span>
          </div>
          <button
            class="button-primary generate-button"
            :disabled="!canGenerate"
            @click="handleGenerate"
          >
            {{ isLoading ? 'Generating...' : 'Generate Avatar' }}
          </button>
          
          <p v-if="error" class="error-message badge-rosa">
            {{ error }}
          </p>
          <p v-if="!limitInfo.can" class="limit-message badge-crema">
            Generation limit reached. Available in {{ limitInfo.daysLeft }} days.
          </p>
        </div>

        <div class="preview-section border-thick shadow-md">
          <div v-if="isLoading" class="skeleton-container">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
          </div>
          <div v-else-if="lastImageUrl" class="image-container">
            <img :src="lastImageUrl" alt="Generated Avatar" class="generated-image" />
          </div>
          <div v-else class="placeholder-container">
            <p class="placeholder-text">Your avatar will appear here</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-md);
}

.skin-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.title {
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  color: var(--color-black-carbon);
}

.creation-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: start;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.input-label {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  font-size: var(--font-size-md);
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.prompt-input {
  width: 100%;
  height: 150px;
  padding: var(--spacing-md);
  border: var(--border-thick);
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  resize: none;
  background-color: var(--color-white-snow);
}

.prompt-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.char-counter {
  display: block;
  text-align: right;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  margin-top: var(--spacing-xs);
}

.generate-button {
  width: 100%;
  font-size: var(--font-size-lg);
}

.generate-button:disabled {
  background-color: var(--color-accent-gris-azulado);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.preview-section {
  aspect-ratio: 1 / 1;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.placeholder-container {
  text-align: center;
  padding: var(--spacing-lg);
}

.placeholder-text {
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  color: #888;
}

.image-container {
  width: 100%;
  height: 100%;
}

.generated-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-message, .limit-message {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  text-align: center;
}

/* Skeleton Loader */
.skeleton-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ddd;
}

.skeleton-image {
  flex: 1;
  background: linear-gradient(90deg, #ccc 25%, #bbb 50%, #ccc 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text {
  height: 20px;
  margin: var(--spacing-md);
  background: linear-gradient(90deg, #ccc 25%, #bbb 50%, #ccc 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsividad */
@media (max-width: 768px) {
  .creation-card {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
