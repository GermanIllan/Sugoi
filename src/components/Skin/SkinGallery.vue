<script setup lang="ts">
import { useSkinStore } from '@/stores/skinStore';
import { storeToRefs } from 'pinia';
import SkinGalleryItem from './SkinGalleryItem.vue';
import type { GalleryItem } from '@/types/skin';

const skinStore = useSkinStore();
const { galleryItems, activeHomeAvatarUrl } = storeToRefs(skinStore);

defineEmits<{
  (e: 'selectItem', item: GalleryItem): void;
}>();
</script>

<template>
  <section class="gallery-section">
    <div class="gallery-header">
      <h2 class="gallery-title">
        <span class="gallery-kanji">ギャラリー</span>
        MIS CREACIONES
      </h2>
      <template v-if="galleryItems.length > 0">
        <div class="limit-indicator badge-crema">
          {{ galleryItems.length }} / 8 imágenes
        </div>
      </template>
      <div class="title-underline"></div>
    </div>
    
    <div v-if="galleryItems.length === 0" class="empty-state border-thick shadow-sm">
      <p class="empty-text">No hay imágenes en tu galería</p>
    </div>
    
    <div v-else class="gallery-container">
      <div class="gallery-grid">
        <SkinGalleryItem 
          v-for="(item, index) in galleryItems" 
          :key="index" 
          :item="item"
          :is-active-home="activeHomeAvatarUrl === item.url"
          @select="$emit('selectItem', $event)"
          @download="skinStore.downloadImage($event)"
          @set-home="skinStore.setActiveHomeAvatar($event)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.limit-indicator {
  margin-top: var(--spacing-xs);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-sm);
  padding: 4px 12px;
}

.empty-state {
  padding: var(--spacing-xxl);
  text-align: center;
  background-color: var(--color-white-snow);
}

.empty-text {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  color: #888;
}

.gallery-container {
  max-height: 600px;
  overflow-y: auto;
  padding: var(--spacing-md);
  border: var(--border-thick);
  background-color: rgba(0, 0, 0, 0.03);
  scrollbar-width: thin;
  scrollbar-color: var(--color-black-carbon) transparent;
}

.gallery-container::-webkit-scrollbar {
  width: 8px;
}

.gallery-container::-webkit-scrollbar-thumb {
  background-color: var(--color-black-carbon);
  border: 1px solid var(--color-white-snow);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
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
