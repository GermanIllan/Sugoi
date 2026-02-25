<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSkinStore } from '@/stores/skinStore';
import { storeToRefs } from 'pinia';

const skinStore = useSkinStore();
const { lastImageUrl, isLoading, error, galleryUrls, activeHomeAvatarUrl } = storeToRefs(skinStore);

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
  <div class="skin-view container">
    <header class="skin-header">
      <h1 class="title">Crea tu Avatar</h1>
      <p class="subtitle">Genera un avatar único estilo anime en pixel art</p>
    </header>

    <main class="skin-content">
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
            <div class="skeleton-image"></div>
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

      <!-- Gallery Section -->
      <section v-if="galleryUrls.length > 0" class="gallery-section">
        <div class="gallery-header">
          <h2 class="gallery-title">
            <span class="gallery-kanji">ギャラリー</span>
            MIS CREACIONES
          </h2>
          <div class="title-underline"></div>
        </div>
        
        <div class="gallery-grid">
          <div 
            v-for="(url, index) in galleryUrls" 
            :key="index" 
            class="gallery-item border-thick shadow-sm"
          >
            <img :src="url" alt="Gallery creation" class="gallery-image" />
            <div class="gallery-item-overlay">
               <button class="overlay-btn" @click="skinStore.downloadImage(url)">↓</button>
               <button 
                 class="overlay-btn" 
                 :class="{ 'is-active': activeHomeAvatarUrl === url }"
                 @click="skinStore.setActiveHomeAvatar(url)"
               >
                 H
               </button>
            </div>
          </div>
        </div>
      </section>
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

/* Gallery Section */
.gallery-section {
  margin-top: var(--spacing-xxl);
  padding-top: var(--spacing-xxl);
  border-top: var(--border-thick);
}

.gallery-header {
  margin-bottom: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-kanji {
  display: block;
  font-size: 2.5rem;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.gallery-title {
  text-align: center;
}

.title-underline {
  width: 80px;
  height: 6px;
  background-color: var(--color-black-carbon);
  margin-top: var(--spacing-xs);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.gallery-item {
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  transition: all 0.2s ease-out;
}

.gallery-item:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--color-black-carbon);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 40px;
  height: 40px;
  background: var(--color-white-snow);
  border: var(--border-thick);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 0 var(--color-black-carbon);
}

.overlay-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--color-black-carbon);
}

.overlay-btn.is-active {
  background-color: var(--color-primary);
  color: var(--color-white-snow);
}

/* Responsividad */
@media (max-width: 768px) {
  .creation-card {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
