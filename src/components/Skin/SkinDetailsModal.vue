<script setup lang="ts">
import type { GalleryItem } from '@/types/skin';

defineProps<{
  item: GalleryItem | null;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'download', url: string): void;
  (e: 'setHome', url: string): void;
  (e: 'delete', url: string): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="item" class="modal-overlay" @click="$emit('close')">
        <div class="modal-content border-thick shadow-lg" @click.stop>
          <!-- Header with Close Button -->
          <div class="modal-header border-bottom-thick">
            <h3 class="modal-title">
              <span class="kanji-small">詳細</span>
              DETALLES DEL AVATAR
            </h3>
            <button class="close-modal-btn border-thick shadow-xs" @click="$emit('close')" aria-label="Close">
              ×
            </button>
          </div>

          <div class="modal-body">
            <!-- Left: Image -->
            <div class="modal-image-wrapper">
              <div class="modal-image-container border-thick shadow-sm">
                <img :src="item.url" alt="Selected avatar" class="modal-img" />
              </div>
            </div>

            <!-- Right: Details & Actions -->
            <div class="modal-details-column">
              <div class="details-section">
                <h4 class="details-subtitle">PROMPT DE GENERACIÓN</h4>
                <div class="prompt-box border-thick shadow-xs">
                  <p class="prompt-text">"{{ item.prompt }}"</p>
                </div>
              </div>

              <div class="actions-section">
                <h4 class="details-subtitle">ACCIONES</h4>
                <div class="modal-actions-grid">
                  <button class="button-primary action-btn" @click="$emit('download', item.url)">
                    <span class="kanji-btn">ダウンロード</span>
                    DESCARGAR
                  </button>
                  <button class="button-primary action-btn home-btn" @click="$emit('setHome', item.url)">
                    <span class="kanji-btn">ホームに設定</span>
                    USAR EN HOME
                  </button>
                  <button class="button-primary action-btn delete-btn" @click="$emit('delete', item.url)">
                    <span class="kanji-btn">削除する</span>
                    ELIMINAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's above navbar */
  padding: var(--spacing-lg);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--color-white-snow);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: radial-gradient(var(--color-accent-gris-azulado) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-white-snow);
  z-index: 2;
}

.modal-title {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
}

.kanji-small {
  font-size: 0.7rem;
  color: var(--color-primary);
  letter-spacing: 2px;
}

.close-modal-btn {
  width: 40px;
  height: 40px;
  background-color: var(--color-accent-rosa);
  border-color: var(--color-black-carbon);
  font-size: 1.5rem;
  font-weight: var(--font-weight-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s ease;
}

.close-modal-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-black-carbon);
}

.close-modal-btn:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}

/* Body */
.modal-body {
  padding: var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  overflow-y: auto;
}

/* Left Column: Image */
.modal-image-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center; /* Center image on mobile */
}

.modal-image-container {
  aspect-ratio: 1/1;
  width: 100%;
  background-color: var(--color-white-snow);
  padding: 12px;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Right Column: Details */
.modal-details-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.details-subtitle {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-xs);
  letter-spacing: 2px;
  margin: 0 0 var(--spacing-xs);
  color: var(--color-black-carbon);
  opacity: 0.8;
}

.prompt-box {
  background-color: var(--color-white-snow);
  padding: var(--spacing-md);
  min-height: 100px;
  display: flex;
  align-items: center;
}

.prompt-text {
  margin: 0;
  font-family: var(--font-body);
  font-style: italic;
  font-weight: var(--font-weight-medium);
  line-height: 1.6;
}

/* Actions Grid */
.modal-actions-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.action-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
  gap: 2px;
}

.kanji-btn {
  font-size: 0.6rem;
  opacity: 0.7;
}

.home-btn {
  background-color: var(--color-primary);
}

.delete-btn {
  background-color: var(--color-accent-rosa);
  color: var(--color-black-carbon);
  margin-top: var(--spacing-sm);
}

.delete-btn:hover {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content {
  animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-pop {
  from { transform: scale(0.9) translateY(20px); }
  to { transform: scale(1) translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-sm);
    align-items: center; /* Push to bottom on mobile to avoid top-nav overlap */
  }

  .modal-content {
    max-height: 85vh; /* More breathing room */
    border-bottom: none;
    border-radius: 20px 20px 0 0; /* Premium rounded top for mobile */
  }

  .modal-header {
    padding: var(--spacing-md);
  }

  .modal-body {
    grid-template-columns: 1fr;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .modal-image-container {
    max-width: 250px; /* Smaller image as requested */
  }

  .modal-title {
    font-size: var(--font-size-md);
  }

  .prompt-box {
    min-height: auto;
  }
}

@media (max-width: 480px) {
  .modal-actions-grid {
    gap: var(--spacing-xs);
  }
}
</style>
