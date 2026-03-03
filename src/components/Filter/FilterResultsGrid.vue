<script setup lang="ts">
import FilterResultCard from './FilterResultCard.vue';
import type { Anime } from '@/types/anime';
import type { Manga } from '@/types/manga';

/**
 * Grid component to display search results with pagination.
 */

interface Props {
    items: Array<Anime | Manga>;
    category: 'anime' | 'manga';
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'changePage', page: number): void;
    (e: 'goToDetail', payload: { type: string, id: number }): void;
}>();

/**
 * Calculates which page numbers to show in the pagination.
 */
const pagesToShow = (current: number, total: number) => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxPagesToShow - 1);
    
    if (end - start + 1 < maxPagesToShow) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
};

const getResultTypeLabel = (item: any) => {
    if (props.category === 'anime') {
        const episodes = (item as Anime).episodes;
        return `${item.type} • ${episodes || '?'} Eps`;
    } else {
        const chapters = (item as Manga).chapters;
        return `${item.type} • ${chapters || '?'} Ch`;
    }
};

const handlePageChange = (page: number) => {
    if (page < 1 || page > props.totalPages || page === props.currentPage) return;
    emit('changePage', page);
};
</script>

<template>
    <div class="results-container">
        <!-- Results Grid -->
        <transition name="list" mode="out-in">
            <div v-if="items.length > 0" key="results">
                <div class="results-grid">
                    <FilterResultCard 
                        v-for="item in items" 
                        :key="item.mal_id"
                        :imageUrl="item.images.webp?.image_url || item.images.jpg.image_url"
                        :title="item.title"
                        :score="item.score"
                        :typeLabel="getResultTypeLabel(item)"
                        :synopsis="item.synopsis || ''"
                        @click="emit('goToDetail', { type: category, id: item.mal_id })"
                    />
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="pagination-container">
                    <button 
                        class="pagination-btn" 
                        :disabled="currentPage === 1"
                        @click="handlePageChange(currentPage - 1)"
                    >
                        &lsaquo;
                    </button>
                    
                    <button 
                        v-for="page in pagesToShow(currentPage, totalPages)" 
                        :key="page"
                        class="pagination-btn"
                        :class="{ 'is-active': page === currentPage }"
                        @click="handlePageChange(page)"
                    >
                        {{ page }}
                    </button>
                    
                    <button 
                        class="pagination-btn" 
                        :disabled="currentPage === totalPages"
                        @click="handlePageChange(currentPage + 1)"
                    >
                        &rsaquo;
                    </button>
                </div>
            </div>
            
            <div v-else-if="isLoading" class="loading-results" key="loading">
                Buscando...
            </div>
            
            <div v-else-if="error" class="error-results shadow-md" key="error">
                <p>{{ error }}</p>
                <button @click="$emit('changePage', currentPage)" class="retry-btn">REINTENTAR</button>
            </div>
            
            <div v-else-if="!isLoading" class="no-results" key="empty">
                No se encontraron resultados.
            </div>
        </transition>
    </div>
</template>

<style scoped>
.results-container {
    width: 100%;
}

.results-grid {
    margin-top: var(--spacing-xl);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs);
    margin: var(--spacing-xl) 0;
}

.pagination-btn {
    min-width: 40px;
    height: 40px;
    padding: 0 var(--spacing-sm);
    background: var(--color-white-snow);
    border: var(--border-thick);
    font-family: var(--font-heading);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
    background: var(--color-primary);
    color: white;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--color-black-carbon);
}

.pagination-btn.is-active {
    background: var(--color-black-carbon);
    color: white;
}

.pagination-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.loading-results, .no-results {
    margin-top: var(--spacing-xxl);
    text-align: center;
    font-family: var(--font-heading);
    color: var(--color-primary);
    font-weight: bold;
    font-size: 1.2rem;
}

.error-results {
    margin: var(--spacing-xxl) auto;
    padding: var(--spacing-xl);
    background: white;
    border: var(--border-thick);
    border-color: var(--color-primary);
    text-align: center;
    max-width: 600px;
}

.error-results p {
    font-family: var(--font-heading);
    color: var(--color-black-carbon);
    margin-bottom: var(--spacing-md);
    line-height: 1.4;
}

.retry-btn {
    background: var(--color-primary);
    color: white;
    border: var(--border-thick);
    padding: 8px 16px;
    font-family: var(--font-heading);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retry-btn:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

/* Transitions */
.list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

@media (max-width: 1400px) {
    .results-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 992px) {
    .results-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 640px) {
    .results-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
