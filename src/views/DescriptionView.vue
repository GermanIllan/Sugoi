<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAnimeStore } from '@/stores/animeStore';
import { useMangaStore } from '@/stores/mangaStore';
import { useAuthStore } from '@/stores/authStore';
import { useTrackingStore } from '@/stores/trackingStore';
import { storeToRefs } from 'pinia';
import TrackingButton from '@/components/Filter/TrackingButton.vue';
import type { TrackingRecord } from '@/types/tracking';

const props = defineProps<{
    type: string;
    id: string;
}>();

const router = useRouter();
const animeStore = useAnimeStore();
const mangaStore = useMangaStore();
const authStore = useAuthStore();
const trackingStore = useTrackingStore();

const { animeDetail, isDetailLoading } = storeToRefs(animeStore);
const { mangaDetail, isDetailLoading: isMangaLoading } = storeToRefs(mangaStore);
const { user, isAuthenticated } = storeToRefs(authStore);

const isLoading = computed(() => props.type === 'anime' ? isDetailLoading.value : isMangaLoading.value);
const item = computed(() => props.type === 'anime' ? animeDetail.value : mangaDetail.value);

const isTracked = computed(() => trackingStore.isTracked(parseInt(props.id), props.type as 'anime' | 'manga'));

onMounted(async () => {
    window.scrollTo(0, 0);
    const numericId = parseInt(props.id);
    
    // Load item details
    if (props.type === 'anime') {
        await animeStore.fetchAnimeById(numericId);
    } else {
        await mangaStore.fetchMangaById(numericId);
    }

    // Load user tracking if authenticated
    if (isAuthenticated.value && user.value) {
        await trackingStore.loadUserTracking(Number(user.value.id));
    }
});

const handleTrackingToggle = async () => {
    if (!isAuthenticated.value || !user.value || !item.value) return;

    const malId = parseInt(props.id);
    const category = props.type as 'anime' | 'manga';
    const numericUserId = Number(user.value.id);

    if (isTracked.value) {
        await trackingStore.removeFromTracking(numericUserId, malId, category);
    } else {
        const record: TrackingRecord = {
            userId: numericUserId,
            malId: malId,
            category: category,
            title: item.value.title,
            imageUrl: item.value.images.webp?.image_url || item.value.images.jpg.image_url,
            score: item.value.score,
            personalScore: null,
            type: item.value.type,
            status: item.value.status,
            watchStatus: 'plan_to_watch',
            notes: '',
            addedAt: new Date().toISOString()
        };
        await trackingStore.addToTracking(record);
    }
};

const goBack = () => {
    router.push({ name: 'filter' });
};
</script>

<template>
    <div class="description-view">
        <div class="container">
            <button @click="goBack" class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                VOLVER
            </button>

            <div v-if="isLoading" class="loading-container">
                <div class="loader">CARGANDO...</div>
            </div>

            <div v-else-if="item" class="detail-grid">
                <!-- Left Column: Image and Basic Info -->
                <aside class="detail-sidebar">
                    <div class="image-container">
                        <img :src="item.images.webp?.large_image_url" :alt="item.title">
                        <div class="score-badge" v-if="item.score">★ {{ item.score }}</div>
                    </div>

                    <TrackingButton 
                        :isTracked="isTracked"
                        :isAuthenticated="isAuthenticated"
                        :isLoading="trackingStore.isLoading"
                        @toggle="handleTrackingToggle"
                    />
                </aside>

                <!-- Right Column: Full Details -->
                <main class="detail-main">
                    <header class="detail-header">
                        <span class="detail-type">{{ type.toUpperCase() }}</span>
                        <h1 class="detail-title">{{ item.title }}</h1>
                        <h2 class="detail-subtitle" v-if="item.title_japanese">{{ item.title_japanese }}</h2>
                    </header>

                    <div class="info-strip">
                        <div class="info-box">
                            <span class="info-label">ESTADO</span>
                            <span class="info-value">{{ item.status }}</span>
                        </div>
                        <div class="info-box" v-if="type === 'anime'">
                            <span class="info-label">EPISODIOS</span>
                            <span class="info-value">{{ (item as any).episodes || '?' }}</span>
                        </div>
                        <div class="info-box" v-if="type === 'manga'">
                            <span class="info-label">CAPITULOS</span>
                            <span class="info-value">{{ (item as any).chapters || '?' }}</span>
                        </div>
                        <div class="info-box">
                            <span class="info-label">RATING</span>
                            <span class="info-value">{{ item.type }}</span>
                        </div>
                    </div>

                    <section class="synopsis-section">
                        <h3 class="section-title">SINOPSIS</h3>
                        <div class="synopsis-box">
                            <p>{{ item.synopsis || 'Sin descripción disponible.' }}</p>
                        </div>
                    </section>

                    <section class="genres-section">
                        <h3 class="section-title">GÉNEROS</h3>
                        <div class="genres-list">
                            <span v-for="genre in item.genres" :key="genre.mal_id" class="genre-tag">
                                {{ genre.name }}
                            </span>
                        </div>
                    </section>
                </main>
            </div>

            <div v-else class="error-container">
                <p>No se encontró la información solicitada.</p>
                <button @click="goBack" class="neo-button">REGRESAR</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.description-view {
    min-height: 100vh;
    padding: var(--spacing-xxl) var(--spacing-lg);
    background-image: 
        linear-gradient(rgba(246, 247, 247, 0.95), rgba(255, 255, 255, 0.95)),
        url('/assets/images/image/lineas4.jpg');
    background-attachment: fixed;
    background-size: cover;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

.back-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: var(--color-white-snow);
    border: var(--border-thick);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-heading);
    font-weight: var(--font-weight-black);
    cursor: pointer;
    margin-bottom: var(--spacing-xl);
    transition: all 0.2s ease;
}

.back-button:hover {
    background: var(--color-primary);
    color: white;
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.detail-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--spacing-xxl);
    background: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: 15px 15px 0 var(--color-black-carbon);
    padding: var(--spacing-xl);
}

.image-container {
    position: relative;
    border: var(--border-thick);
    overflow: hidden;
}

.image-container img {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
}

.image-container:hover img {
    transform: scale(1.05);
}

.score-badge {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--color-primary);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-weight: bold;
    border: var(--border-thick);
    box-shadow: 4px 4px 0 var(--color-black-carbon);
}

.detail-header {
    margin-bottom: var(--spacing-xl);
}

.detail-type {
    background: var(--color-black-carbon);
    color: white;
    padding: 2px 8px;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 2px;
}

.detail-title {
    font-size: 2.5rem;
    font-weight: var(--font-weight-black);
    color: var(--color-black-carbon);
    margin: var(--spacing-xs) 0;
    line-height: 1.1;
    text-transform: uppercase;
}

.detail-subtitle {
    font-size: 1.2rem;
    color: var(--color-primary);
    font-weight: bold;
}

.info-strip {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.info-box {
    background: #f0f0f0;
    border: var(--border-thick);
    padding: var(--spacing-sm);
    min-width: 120px;
}

.info-label {
    display: block;
    font-size: 0.7rem;
    font-weight: bold;
    color: #666;
    letter-spacing: 1px;
}

.info-value {
    font-weight: var(--font-weight-black);
    color: var(--color-black-carbon);
    font-size: 0.9rem;
}

.section-title {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: var(--font-weight-black);
    border-left: 6px solid var(--color-primary);
    padding-left: var(--spacing-sm);
    margin: var(--spacing-lg) 0 var(--spacing-sm);
}

.synopsis-box {
    background: white;
    border: var(--border-thick);
    padding: var(--spacing-md);
    line-height: 1.6;
    font-family: var(--font-body);
}

.genres-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
}

.genre-tag {
    background: var(--color-white-snow);
    border: var(--border-thin);
    padding: 4px 12px;
    font-size: 0.8rem;
    font-weight: bold;
    transition: all 0.2s ease;
}

.genre-tag:hover {
    background: var(--color-black-carbon);
    color: white;
}

.loading-container, .error-container {
    text-align: center;
    padding: var(--spacing-xxl);
}

.loader {
    font-size: 2rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
    letter-spacing: 5px;
    animation: pulse 1s infinite alternate;
}

@keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
}

@media (max-width: 768px) {
    .detail-grid {
        grid-template-columns: 1fr;
    }
    
    .detail-sidebar {
        max-width: 250px;
        margin: 0 auto;
    }
    
    .detail-title {
        font-size: 1.8rem;
    }
}
</style>
