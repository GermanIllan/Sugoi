<script setup lang="ts">
import { ref } from 'vue';
import { useSkinStore } from '@/stores/skinStore';
import SkinGenerator from '@/components/Skin/SkinGenerator.vue';
import SkinGallery from '@/components/Skin/SkinGallery.vue';
import SkinDetailsModal from '@/components/Skin/SkinDetailsModal.vue';
import type { GalleryItem } from '@/types/skin';

const skinStore = useSkinStore();
const selectedItem = ref<GalleryItem | null>(null);
</script>

<template>
  <div class="skin-view container">
    <header class="skin-header">
      <h1 class="title">Crea tu Avatar</h1>
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
      />
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

.skin-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxl);
}
</style>
