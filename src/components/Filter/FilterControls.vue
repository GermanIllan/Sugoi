<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Genre } from '@/types/genre';

interface Props {
    searchQuery: string;
    orderBy: string;
    sort: 'desc' | 'asc';
    selectedGenre: string | number;
    genres: Genre[];
    isLoadingGenres: boolean;
    placeholder: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:searchQuery', value: string): void;
    (e: 'update:selectedGenre', value: string | number): void;
    (e: 'update:order', order: { value: string, sort?: 'desc' | 'asc' }): void;
    (e: 'search'): void;
}>();

const isOrderDropdownOpen = ref(false);
const isGenreDropdownOpen = ref(false);

const orderOptions = [
    { label: 'Ranking (Estrellas)', value: 'score', sort: undefined },
    { label: 'Más Moderno', value: 'start_date', sort: 'desc' },
    { label: 'Más Antiguo', value: 'start_date', sort: 'asc' },
    { label: 'Más Vistos', value: 'popularity', sort: 'asc' },
    { label: 'Menos Vistos', value: 'popularity', sort: 'desc' }
] as const;

const currentOrderLabel = computed(() => {
    const option = orderOptions.find(o => o.value === props.orderBy && (o.sort === undefined || o.sort === props.sort));
    return option ? option.label : 'Ordenar por';
});

const selectOrder = (option: typeof orderOptions[number]) => {
    emit('update:order', { value: option.value, sort: option.sort });
    isOrderDropdownOpen.value = false;
};

const selectGenre = (genreId: string | number) => {
    emit('update:selectedGenre', genreId);
    isGenreDropdownOpen.value = false;
};

const handleSearchInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:searchQuery', value);
    emit('search');
};
</script>

<template>
    <div class="filter-controls-row">
        <!-- Search Group -->
        <div class="filter-group search-group">
            <label class="filter-label">BUSCAR</label>
            <div class="search-box-container">
                <div class="order-box-link">
                    <input 
                        type="text" 
                        :value="searchQuery" 
                        @input="handleSearchInput"
                        :placeholder="placeholder" 
                        class="neo-input"
                    >
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Order Group -->
        <div class="filter-group order-group">
            <label class="filter-label">ORDENAR POR</label>
            <div class="order-controls-combined">
                <div class="neo-dropdown" :class="{ 'is-open': isOrderDropdownOpen }">
                    <div class="order-box-link">
                        <button class="neo-dropdown-toggle" @click="isOrderDropdownOpen = !isOrderDropdownOpen">
                            {{ currentOrderLabel }}
                            <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m6 9 12 0-6 6z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div v-if="isOrderDropdownOpen" class="neo-dropdown-menu">
                        <div 
                            v-for="opt in orderOptions" 
                            :key="opt.label" 
                            class="dropdown-item"
                            :class="{ 'is-active': orderBy === opt.value }"
                            @click="selectOrder(opt)"
                        >
                            {{ opt.label }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Categories/Genres Group -->
        <div class="filter-group genre-group">
            <div v-if="isLoadingGenres" class="loading-state">Cargando...</div>
            <template v-else>
                <label class="filter-label">CATEGORÍAS</label>
                <div class="neo-dropdown" :class="{ 'is-open': isGenreDropdownOpen }">
                    <div class="order-box-link">
                        <button class="neo-dropdown-toggle" @click="isGenreDropdownOpen = !isGenreDropdownOpen">
                            {{ genres.find(g => g.mal_id === selectedGenre)?.name || 'Todas' }}
                            <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m6 9 12 0-6 6z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div v-if="isGenreDropdownOpen" class="neo-dropdown-menu">
                        <div class="dropdown-item" @click="selectGenre('')">Todas las categorías</div>
                        <div 
                            v-for="genre in genres" 
                            :key="genre.mal_id" 
                            class="dropdown-item"
                            :class="{ 'is-active': selectedGenre === genre.mal_id }"
                            @click="selectGenre(genre.mal_id)"
                        >
                            {{ genre.name }}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.filter-controls-row {
    display: flex;
    gap: var(--spacing-lg);
    width: 100%;
    align-items: flex-end;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.search-group { flex: 2; min-width: 250px; }
.order-group { flex: 1.5; min-width: 180px; }
.genre-group { flex: 1.5; min-width: 180px; }

.filter-label {
    font-family: var(--font-heading);
    font-size: var(--font-size-sm);
    color: var(--color-black-carbon);
    letter-spacing: 1px;
    text-transform: uppercase;
}

.search-box-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.order-box-link {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: var(--shadow-offset-sm);
    transition: all 0.2s ease;
}

.order-box-link:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.neo-input {
    width: 100%;
    height: 60px;
    padding: var(--spacing-md);
    padding-left: 50px;
    font-family: var(--font-heading);
    font-size: var(--font-size-md);
    background: transparent;
    border: none;
    outline: none;
}

.neo-input:focus {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.search-icon {
    position: absolute;
    left: var(--spacing-md);
    color: var(--color-black-carbon);
    pointer-events: none;
}

.order-controls-combined {
    display: flex;
    align-items: stretch;
    width: 100%;
    position: relative;
    z-index: 50;
    gap: var(--spacing-xs);
}

.neo-dropdown {
    position: relative;
    width: 100%;
}

.neo-dropdown-toggle {
    width: 100%;
    padding: var(--spacing-md);
    background: transparent;
    border: none;
    font-family: var(--font-heading);
    font-weight: bold;
    font-size: var(--font-size-sm);
    color: var(--color-black-carbon);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    text-transform: uppercase;
}

.dropdown-arrow {
    transition: transform 0.3s ease;
}

.neo-dropdown.is-open .dropdown-arrow {
    transform: rotate(180deg);
}

.neo-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 250px;
    background: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: var(--shadow-offset-sm);
    z-index: 100;
    overflow-y: auto;
    animation: slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dropdown-item {
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-heading);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: var(--border-thin);
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover, .dropdown-item.is-active {
    background: var(--color-primary);
    color: white;
}

.loading-state {
    font-family: var(--font-heading);
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    text-align: center;
    padding: var(--spacing-md);
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
    .filter-controls-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
    }
    .search-group { grid-column: span 2; }
}

@media (max-width: 640px) {
    .filter-controls-row {
        grid-template-columns: 1fr;
    }
    .search-group, .order-group, .genre-group { grid-column: span 1; }
}
</style>
