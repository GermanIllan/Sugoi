<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useSkinStore } from '@/stores/skinStore';
import { storeToRefs } from 'pinia';

const skinStore = useSkinStore();
const { lastImageUrl, isLoading, error } = storeToRefs(skinStore);

const secondsElapsed = ref(0);
let timerInterval: number | null = null;

const startTimer = () => {
  secondsElapsed.value = 0;
  timerInterval = window.setInterval(() => {
    secondsElapsed.value++;
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

watch(isLoading, (loading) => {
  if (loading) {
    startTimer();
  } else {
    stopTimer();
  }
});

onUnmounted(() => {
  stopTimer();
});

const prompt = ref('');
const showFeedback = ref(false);
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

const handleDownload = () => {
  if (lastImageUrl.value) {
    skinStore.downloadImage(lastImageUrl.value);
  }
};

const handleSetHome = () => {
  if (lastImageUrl.value) {
    skinStore.setActiveHomeAvatar(lastImageUrl.value);
    showFeedback.value = true;
    setTimeout(() => {
      showFeedback.value = false;
    }, 3000);
  }
};
</script>

<template>
  <div class="card creation-card">
    <div class="input-section">
      <label for="avatar-prompt" class="input-label">Describe tu avatar</label>
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
        {{ isLoading ? 'Generando...' : 'Generar Avatar' }}
      </button>
      
      <p v-if="error" class="error-message badge-rosa">
        {{ error }}
      </p>
      <p v-if="!limitInfo.can" class="limit-message badge-crema">
        Limite de generación alcanzado. Disponible en {{ limitInfo.daysLeft }} días.
      </p>
    </div>

    <div class="preview-section border-thick shadow-md">
      <div v-if="isLoading" class="skeleton-container">
        <div class="skeleton-image">
          <div class="timer-overlay">
            <span class="timer-value">{{ secondsElapsed }}s</span>
            <span class="timer-label">GENERANDO...</span>
          </div>
        </div>
        <div class="skeleton-text"></div>
      </div>
      <div v-else-if="lastImageUrl" class="image-container-wrapper">
        <div class="image-container">
          <img :src="lastImageUrl" alt="Generated Avatar" class="generated-image" />
        </div>
        <div class="image-actions">
          <button class="action-button download-btn" @click="handleDownload">
            <span class="kanji-small">ダウンロード</span>
            Descargar
          </button>
          <button class="action-button home-btn" @click="handleSetHome">
             <span class="kanji-small">ホームに設定</span>
            {{ showFeedback ? '¡ACTUALIZADO!' : 'USAR EN HOME' }}
          </button>
        </div>
      </div>
      <div v-else class="placeholder-container">
        <p class="placeholder-text">Tu avatar aparecerá aquí</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* Image Actions */
.image-container-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-container {
  flex: 1;
  overflow: hidden;
}

.image-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: var(--border-thick);
  background-color: var(--color-white-snow);
}

.action-button {
  padding: var(--spacing-sm);
  border: none;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: var(--font-size-xs);
  transition: all 0.1s ease;
}

.kanji-small {
  font-size: 0.6rem;
  opacity: 0.7;
}

.download-btn {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  border-right: var(--border-thick);
}

.home-btn {
  background-color: var(--color-primary);
  color: var(--color-white-snow);
}

.action-button:hover {
  filter: brightness(1.2);
}

.action-button:active {
  transform: translate(1px, 1px);
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

.timer-overlay {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  background-color: rgba(0, 0, 0, 0.1);
}

.timer-value {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
  text-shadow: 4px 4px 0 var(--color-black-carbon);
  line-height: 1;
}

.timer-label {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-md);
  color: var(--color-black-carbon);
  letter-spacing: 2px;
}

/* Responsividad */
@media (max-width: 768px) {
  .creation-card {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
