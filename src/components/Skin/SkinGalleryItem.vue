<script setup lang="ts">
import type { GalleryItem } from '@/types/skin';

defineProps<{
  item: GalleryItem;
  isActiveHome: boolean;
}>();

defineEmits<{
  (e: 'select', item: GalleryItem): void;
  (e: 'download', url: string): void;
  (e: 'setHome', url: string): void;
  (e: 'delete', url: string): void;
}>();
</script>

<template>
  <div class="gallery-item border-thick shadow-sm" @click="$emit('select', item)">
    <img :src="item.url" alt="Gallery creation" class="gallery-image" />
    <div class="gallery-item-overlay">
      <button class="overlay-btn" @click.stop="$emit('download', item.url)" title="Descargar">↓</button>
      <button 
        class="overlay-btn" 
        :class="{ 'is-active': isActiveHome }"
        @click.stop="$emit('setHome', item.url)"
        title="Usar en Home"
      >
        H
      </button>
      <button class="overlay-btn delete-btn" @click.stop="$emit('delete', item.url)" title="Eliminar">
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery-item {
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  transition: all 0.2s ease-out;
  cursor: pointer;
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

.delete-btn:hover {
  background-color: var(--color-black-carbon);
  color: var(--color-primary);
}
</style>
