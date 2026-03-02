<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useTrackingStore } from '@/stores/trackingStore';
import { useAuthStore } from '@/stores/authStore';
import { useScrollToTopOnUpdate } from '@/composables/useScroll';
import TrackingDashboard from '@/components/Tracking/TrackingDashboard.vue';
import TrackingFilters from '@/components/Tracking/TrackingFilters.vue';
import TrackingGrid from '@/components/Tracking/TrackingGrid.vue';
import type { TrackingRecord, WatchStatus } from '@/types/tracking';

const trackingStore = useTrackingStore();
const authStore = useAuthStore();

// Filter states
const activeCategory = ref<'all' | 'anime' | 'manga'>('all');
const activeStatus = ref<'all' | WatchStatus>('all');

// Auto-scroll on filter changes
useScrollToTopOnUpdate(activeCategory);
useScrollToTopOnUpdate(activeStatus);
const sortOrder = ref<'newest' | 'score' | 'title'>('newest');

onMounted(async () => {
    if (authStore.user) {
        await trackingStore.loadUserTracking(Number(authStore.user.id));
    }
});

const filteredItems = computed(() => {
    let items = [...trackingStore.userTracking];

    // Filter by category
    if (activeCategory.value !== 'all') {
        items = items.filter(item => item.category === activeCategory.value);
    }

    // Filter by status
    if (activeStatus.value !== 'all') {
        items = items.filter(item => item.watchStatus === activeStatus.value);
    }

    // Sort
    if (sortOrder.value === 'score') {
        items.sort((a, b) => (b.personalScore || 0) - (a.personalScore || 0));
    } else if (sortOrder.value === 'title') {
        items.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        // Newest
        items.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }

    return items;
});

const handleUpdate = async (id: number, data: Partial<TrackingRecord>) => {
    await trackingStore.updateTracking(id, data);
};

const handleRemove = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres quitar este ítem de tu lista?')) {
        const item = trackingStore.userTracking.find(i => i.id === id);
        if (item && authStore.user) {
            await trackingStore.removeFromTracking(Number(authStore.user.id), item.malId, item.category);
        }
    }
};
</script>

<template>
    <div class="tracking-view">
        <div class="container container-wide">
            <header class="tracking-header">
                <div class="header-main">
                    <span class="kanji-vertical">追跡日記</span>
                    <div class="title-group">
                        <h1 class="main-title">MI REGISTRO PERSONAL</h1>
                        <p class="subtitle">Gestiona tu colección y progreso de anime y manga.</p>
                    </div>
                </div>
            </header>

            <TrackingDashboard :stats="trackingStore.stats" />

            <TrackingFilters 
                v-model:activeCategory="activeCategory"
                v-model:activeStatus="activeStatus"
                v-model:sortOrder="sortOrder"
            />

            <TrackingGrid 
                :items="filteredItems"
                :isLoading="trackingStore.isLoading"
                @update="handleUpdate"
                @remove="handleRemove"
            />
        </div>
    </div>
</template>

<style scoped>
.tracking-view {
    min-height: 100vh;
    padding: var(--spacing-xxl) var(--spacing-md);
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

.tracking-header {
    margin-bottom: var(--spacing-xl);
}

.header-main {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
}

.kanji-vertical {
    writing-mode: vertical-rl;
    font-size: 2rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
    line-height: 1;
}

.main-title {
    font-family: var(--font-heading);
    font-size: 3.5rem;
    font-weight: var(--font-weight-black);
    letter-spacing: -2px;
    line-height: 0.9;
    margin-bottom: var(--spacing-xs);
    text-transform: uppercase;
}

.subtitle {
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: #666;
    font-weight: 500;
}

@media (max-width: 768px) {
    .main-title {
        font-size: 2.5rem;
    }
    
    .kanji-vertical {
        display: none;
    }
}
</style>
