<script setup lang="ts">
import { ref } from 'vue';
import { useSkinStore } from '@/stores/skinStore';
import SkinGenerator from '@/components/Skin/SkinGenerator.vue';
import SkinGallery from '@/components/Skin/SkinGallery.vue';
import SkinDetailsModal from '@/components/Skin/SkinDetailsModal.vue';
import type { GalleryItem } from '@/types/skin';

const skinStore = useSkinStore();
const selectedItem = ref<GalleryItem | null>(null);

const handleDelete = (url: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta creación?')) {
    skinStore.deleteImage(url);
    selectedItem.value = null;
  }
};
</script>

<template>
  <div class="skin-view container">
    <header class="skin-header">
      <h1 class="title"><span class="kanji">アバターを作成しましょう</span> <br> Crea tu Avatar</h1>
      <p class="subtitle">Genera un avatar único estilo anime en pixel art</p>
    </header>

    <main class="skin-content">
      <SkinGenerator />
      
      <SkinGallery @select-item="selectedItem = $event" />

      <SkinDetailsModal
        :item="selectedItem"
        @close="selectedItem = null"
        @download="skinStore.downloadImage($event)"
        @set-home="skinStore.setActiveHomeAvatar($event)"
        @delete="handleDelete"
      />
    </main>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-md);
}

.container::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(246, 247, 247, 0.85), rgba(255, 255, 255, 0.85)),
    url('@/assets/images/image/lineas4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container > * {
  position: relative;
  z-index: 1;
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

.skin-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxl);
}

.kanji {
  font-size: 2.6rem;
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
}

.kanji.orange {
  color: #FF6B00;
}
</style>
