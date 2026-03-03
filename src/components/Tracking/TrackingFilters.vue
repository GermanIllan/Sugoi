<script setup lang="ts">
import type { WatchStatus } from '@/types/tracking';

defineProps<{
    activeCategory: 'all' | 'anime' | 'manga';
    activeStatus: 'all' | WatchStatus;
    sortOrder: 'newest' | 'score' | 'title';
}>();

const emit = defineEmits<{
    (e: 'update:activeCategory', value: 'all' | 'anime' | 'manga'): void;
    (e: 'update:activeStatus', value: 'all' | WatchStatus): void;
    (e: 'update:sortOrder', value: 'newest' | 'score' | 'title'): void;
}>();
</script>

<template>
    <div class="tracking-filters border-thick">
        <div class="filter-group">
            <label class="filter-label">CATEGORÍA</label>
            <div class="filter-buttons">
                <button 
                    :class="{ active: activeCategory === 'all' }" 
                    @click="emit('update:activeCategory', 'all')"
                >TODOS</button>
                <button 
                    :class="{ active: activeCategory === 'anime' }" 
                    @click="emit('update:activeCategory', 'anime')"
                >ANIME</button>
                <button 
                    :class="{ active: activeCategory === 'manga' }" 
                    @click="emit('update:activeCategory', 'manga')"
                >MANGA</button>
            </div>
        </div>

        <div class="filter-group">
            <label class="filter-label">ESTADO</label>
            <div class="filter-buttons">
                <button 
                    :class="{ active: activeStatus === 'all' }" 
                    @click="emit('update:activeStatus', 'all')"
                >TODOS</button>
                <button 
                    :class="{ active: activeStatus === 'watched' }" 
                    @click="emit('update:activeStatus', 'watched')"
                >VISTO</button>
                <button 
                    :class="{ active: activeStatus === 'plan_to_watch' }" 
                    @click="emit('update:activeStatus', 'plan_to_watch')"
                >PENDIENTE</button>
            </div>
        </div>

        <div class="filter-group">
            <label class="filter-label">ORDENAR POR</label>
            <select 
                class="filter-select border-thin"
                :value="sortOrder"
                @change="e => emit('update:sortOrder', (e.target as HTMLSelectElement).value as any)"
            >
                <option value="newest">MÁS RECIENTE</option>
                <option value="score">PUNTUACIÓN</option>
                <option value="title">TÍTULO (A-Z)</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.tracking-filters {
    background: var(--color-white-snow);
    padding: var(--spacing-md);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    align-items: flex-end;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.filter-label {
    font-size: 0.7rem;
    font-weight: var(--font-weight-black);
    letter-spacing: 1px;
    color: #666;
}

.filter-buttons {
    display: flex;
    gap: 2px;
    background: var(--color-black-carbon);
    border: 2px solid var(--color-black-carbon);
}

.filter-buttons button {
    padding: 6px 12px;
    background: white;
    border: none;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-buttons button:hover {
    background: #f0f0f0;
}

.filter-buttons button.active {
    background: var(--color-primary);
    color: white;
}

.filter-select {
    padding: 6px 12px;
    font-family: var(--font-heading);
    font-weight: bold;
    background: white;
    cursor: pointer;
    outline: none;
}

@media (max-width: 768px) {
    .tracking-filters {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
