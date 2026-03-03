<script setup lang="ts">
import type { TrackingRecord } from '@/types/tracking';
import TrackingItemCard from './TrackingItemCard.vue';

defineProps<{
    items: TrackingRecord[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    (e: 'update', id: number, data: Partial<TrackingRecord>): void;
    (e: 'remove', id: number): void;
}>();
</script>

<template>
    <div class="tracking-grid-container">
        <div v-if="isLoading" class="loading-state">
            <div class="loader">CARGANDO LISTA...</div>
        </div>

        <div v-else-if="items.length === 0" class="empty-state border-thick">
            <p>TU LISTA ESTÁ VACÍA</p>
            <router-link to="/filtros" class="neo-link">EXPLORAR ANIME/MANGA</router-link>
        </div>

        <div v-else class="items-grid">
            <TrackingItemCard 
                v-for="item in items" 
                :key="item.id" 
                :item="item"
                @update="(id, data) => emit('update', id, data)"
                @remove="id => emit('remove', id)"
            />
        </div>
    </div>
</template>

<style scoped>
.tracking-grid-container {
    padding-bottom: 50px; /* Space for dropdowns in last row */
}

.loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xxl);
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
}

.empty-state p {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: var(--font-weight-black);
    margin-bottom: var(--spacing-md);
}

.neo-link {
    background: var(--color-black-carbon);
    color: white;
    padding: 8px 16px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.2s ease;
}

.neo-link:hover {
    background: var(--color-primary);
}

.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--spacing-xl);
}

@media (max-width: 480px) {
    .items-grid {
        grid-template-columns: 1fr;
    }
}
</style>
