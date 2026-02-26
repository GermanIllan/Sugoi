<script setup lang="ts">
import type { GalleryItem } from '@/types/skin';

defineProps<{
  item: GalleryItem | null;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'download', url: string): void;
  (e: 'setHome', url: string): void;
}>();
</script>

<template>
  <div v-if="item" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content border-thick shadow-lg" @click.stop>
      <button class="close-modal" @click="$emit('close')">×</button>
      <h3 class="modal-title">DETALLES DEL PROMPT</h3>
      <div class="modal-image-container border-thick">
        <img :src="item.url" alt="Selected avatar" />
      </div>
      <div class="prompt-details">
        <p class="prompt-text">"{{ item.prompt }}"</p>
      </div>
      <div class="modal-actions">
        <button class="button-primary" @click="$emit('download', item.url)">DESCARGAR</button>
        <button class="button-primary home-btn" @click="$emit('setHome', item.url)">USAR EN HOME</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.modal-content {
  background-color: var(--color-white-snow);
  max-width: 500px;
  width: 100%;
  padding: var(--spacing-xl);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.close-modal {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: var(--font-weight-black);
  cursor: pointer;
  line-height: 1;
}

.modal-title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-md);
  text-align: center;
  margin-top: var(--spacing-sm);
}

.modal-image-container {
  aspect-ratio: 1/1;
  width: 100%;
  overflow: hidden;
}

.modal-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prompt-details {
  background-color: #eee;
  padding: var(--spacing-md);
  border-left: 5px solid var(--color-primary);
}

.prompt-text {
  font-family: var(--font-body);
  font-style: italic;
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.modal-actions button {
  width: 100%;
}
</style>
