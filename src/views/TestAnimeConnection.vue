<script setup lang="ts">
import { useAnimeStore } from '@/stores/animeStore';
import { onMounted, ref } from 'vue';

const store = useAnimeStore();
const testId = ref<number>(1);

onMounted(() => {
    console.log("Anime connection test view mounted.");
});

</script>

<template>
  <div class="test-container" style="padding-top: 100px; color: white; padding-bottom: 100px;">
    <h2>Test Anime Store</h2>
    
    <!-- SEARCH SECTION -->
    <div style="margin-bottom: 20px; border: 1px solid #444; padding: 20px;">
      <h3>Search Anime</h3>
      <input v-model="store.currentSearchQuery" placeholder="Search anime..." />
      <button @click="store.fetchAnimeList(store.currentSearchQuery)" :disabled="store.isLoading" style="background: red; color: white; padding: 10px; margin-left: 10px;">
        Search
      </button>
      <button @click="store.loadMoreAnime()" :disabled="!store.pagination?.has_next_page || store.isLoading" style="background: white; color: black; padding: 10px; margin-left: 10px;">
        Load More
      </button>
      
      <div v-if="store.isLoading">Loading...</div>
      <div v-if="store.error" style="color: red;">Error: {{ store.error }}</div>

      <div v-if="store.pagination" style="margin-top: 10px;">
        <p>Items: {{ store.animeList.length }} / {{ store.pagination.items.total }} | Page: {{ store.pagination.current_page }}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 20px; max-height: 400px; overflow-y: auto;">
        <div v-for="anime in store.animeList" :key="anime.mal_id" style="border: 1px solid #333; padding: 5px; font-size: 12px;">
          <img :src="anime.images.jpg.image_url" :alt="anime.title" style="width: 100%; height: auto;"/>
          <p><strong>{{ anime.title }}</strong></p>
        </div>
      </div>
    </div>

    <!-- DETAIL SECTION -->
    <div style="margin-bottom: 20px; border: 1px solid blue; padding: 20px;">
      <h3>Fetch Anime Detail</h3>
      <input type="number" v-model.number="testId" placeholder="Anime ID (e.g. 1)" />
      <button @click="store.fetchAnimeById(testId)" :disabled="store.isDetailLoading" style="background: blue; color: white; padding: 10px; margin-left: 10px;">
        Get Detail
      </button>

      <div v-if="store.isDetailLoading">Loading detail...</div>
      <div v-if="store.detailError" style="color: red;">Detail Error: {{ store.detailError }}</div>

      <div v-if="store.animeDetail" style="margin-top: 20px; display: flex; gap: 20px;">
        <img :src="store.animeDetail.images.jpg.large_image_url" style="width: 200px; height: auto;" />
        <div>
          <h4>{{ store.animeDetail.title }}</h4>
          <p><strong>Status:</strong> {{ store.animeDetail.status }}</p>
          <p><strong>Score:</strong> {{ store.animeDetail.score }}</p>
          <p><strong>Synopsis:</strong> {{ store.animeDetail.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
