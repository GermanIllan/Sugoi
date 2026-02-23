<script setup lang="ts">
import { useAnimeStore } from '@/stores/animeStore';
import { onMounted } from 'vue';

const store = useAnimeStore();

onMounted(() => {
    // Temporal call to verify it works visually on the existing HomeView if we wanted to
    // or just leave it for devtools inspection.
    console.log("Anime connection test view mounted.");
});

</script>

<template>
  <div class="test-container" style="padding-top: 100px; color: white;">
    <h2>Test Anime Store</h2>
    <div style="margin-bottom: 20px;">
      <input v-model="store.currentSearchQuery" placeholder="Search anime..." />
      <button @click="store.fetchAnimeList(store.currentSearchQuery)" :disabled="store.isLoading" style="background: red; padding: 10px; margin-left: 10px;">
        Search
      </button>
      <button @click="store.loadMoreAnime()" :disabled="!store.pagination?.has_next_page || store.isLoading" style="background: white; color: black; padding: 10px; margin-left: 10px;">
        Load More
      </button>
    </div>

    <div v-if="store.isLoading">Loading...</div>
    <div v-if="store.error" style="color: red;">Error: {{ store.error }}</div>

    <div v-if="store.pagination">
      <p>Total Items: {{ store.pagination.items.total }}</p>
      <p>Current Page: {{ store.pagination.current_page }}</p>
      <p>Has Next Page: {{ store.pagination.has_next_page }}</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
      <div v-for="anime in store.animeList" :key="anime.mal_id" style="border: 1px solid #333; padding: 10px;">
        <img :src="anime.images.jpg.image_url" :alt="anime.title" style="width: 100%; height: auto;"/>
        <p><strong>{{ anime.title }}</strong></p>
        <p>Score: {{ anime.score }}</p>
      </div>
    </div>
  </div>
</template>
