<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAnimeStore } from '@/stores/animeStore';
import { useMangaStore } from '@/stores/mangaStore';
import { storeToRefs } from 'pinia';

const animeStore = useAnimeStore();
const mangaStore = useMangaStore();

const { animeGenres, isLoadingGenres: loadingAnimeGenres } = storeToRefs(animeStore);
const { mangaGenres, isLoadingGenres: loadingMangaGenres } = storeToRefs(mangaStore);

const selectedCategory = ref(null);
const selectedGenre = ref('');
const isGenreDropdownOpen = ref(false);

const searchQuery = ref('');

onMounted(() => {
    animeStore.fetchAnimeGenres();
    mangaStore.fetchMangaGenres();
});

const selectCategory = (category) => {
    if (selectedCategory.value === category) {
        selectedCategory.value = null;
    } else {
        selectedCategory.value = category;
        selectedGenre.value = ''; // Reset genre when switching category
        searchQuery.value = ''; // Reset search
        isGenreDropdownOpen.value = false;
    }
};

const toggleGenreDropdown = () => {
    isGenreDropdownOpen.value = !isGenreDropdownOpen.value;
};

const selectGenre = (genreId) => {
    selectedGenre.value = genreId;
    isGenreDropdownOpen.value = false;
};

watch(selectedGenre, () => {
    handleSearch();
});

const handleSearch = async () => {
    const query = searchQuery.value.trim();
    const genre = selectedGenre.value ? selectedGenre.value.toString() : '';
    
    if (!query && !genre) {
        if (selectedCategory.value === 'anime') animeStore.animeList = [];
        if (selectedCategory.value === 'manga') mangaStore.mangaList = [];
        return;
    }

    if (selectedCategory.value === 'anime') {
        if (query && /^\d+$/.test(query)) {
            await animeStore.fetchAnimeById(parseInt(query));
            if (animeStore.animeDetail) {
                // @ts-ignore
                animeStore.animeList = [animeStore.animeDetail];
            }
        } else {
            await animeStore.fetchAnimeList(query, genre);
        }
    } else if (selectedCategory.value === 'manga') {
        if (query && /^\d+$/.test(query)) {
            await mangaStore.fetchMangaById(parseInt(query));
            if (mangaStore.mangaDetail) {
                // @ts-ignore
                mangaStore.mangaList = [mangaStore.mangaDetail];
            }
        } else {
            await mangaStore.fetchMangaList(query, genre);
        }
    }
};
</script>

<template>
    <div class="filter-view">
        <div class="container">
            <header class="view-header" :class="{ 'header-minimized': selectedCategory }">
                <h1 class="view-kanji">フィルター</h1>
                <h2 class="view-title">FILTRAR POR CATEGORÍA</h2>
            </header>

            <div class="filter-grid" :class="{ 'has-selection': selectedCategory }">
                <TransitionGroup name="stagger">
                    <!-- Manga Card -->
                    <div 
                        v-if="!selectedCategory || selectedCategory === 'manga'"
                        key="manga"
                        class="filter-card card-manga" 
                        :class="{ 'is-selected': selectedCategory === 'manga' }"
                        @click="selectedCategory !== 'manga' && selectCategory('manga')"
                    >
                        <!-- Close button -->
                        <button 
                            v-if="selectedCategory === 'manga'" 
                            class="close-button" 
                            @click.stop="selectedCategory = null"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div class="card-inner">
                            <span class="card-kanji">漫画</span>
                            <h3 class="card-title">MANGA</h3>
                        </div>
                        
                        <Transition name="fade">
                            <div v-if="selectedCategory === 'manga'" class="filter-content" @click.stop>
                                <div class="filter-controls">
                                    <label class="filter-label">BUSCAR </label>
                                    <div v-if="loadingMangaGenres" class="loading-state">Cargando géneros...</div>
                                    <div v-else class="search-filter-row">
                                        <div class="search-box">
                                            <input 
                                                type="text" 
                                                v-model="searchQuery" 
                                                @input="handleSearch"
                                                placeholder="Buscar manga..." 
                                                class="neo-input"
                                            >
                                            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </div>
                                        <div class="select-box">
                                            <div class="neo-dropdown" :class="{ 'is-open': isGenreDropdownOpen }">
                                                <button class="neo-dropdown-toggle" @click="toggleGenreDropdown">
                                                    {{ mangaGenres.find(g => g.mal_id === selectedGenre)?.name || 'Todos los géneros' }}
                                                    <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
                                                </button>
                                                <div v-if="isGenreDropdownOpen" class="neo-dropdown-menu">
                                                    <div class="dropdown-item" @click="selectGenre('')">Categorias</div>
                                                    <div 
                                                        v-for="genre in mangaGenres" 
                                                        :key="genre.mal_id" 
                                                        class="dropdown-item"
                                                        :class="{ 'is-active': selectedGenre === genre.mal_id }"
                                                        @click="selectGenre(genre.mal_id)"
                                                    >
                                                        {{ genre.name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Results display -->
                                <Transition name="list">
                                    <div v-if="mangaStore.mangaList.length > 0" class="results-grid">
                                        <article v-for="manga in mangaStore.mangaList" :key="manga.mal_id" class="result-card">
                                            <div class="result-image">
                                                <img :src="manga.images.webp?.image_url" :alt="manga.title">
                                                <span class="result-score" v-if="manga.score">★ {{ manga.score }}</span>
                                            </div>
                                            <div class="result-info">
                                                <h4 class="result-title">{{ manga.title }}</h4>
                                                <p class="result-type">{{ manga.type }} • {{ manga.chapters || '?' }} Ch</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div v-else-if="mangaStore.isLoading" class="loading-results">
                                        Buscando...
                                    </div>
                                </Transition>
                            </div>
                        </Transition>
                    </div>

                    <!-- Anime Card -->
                    <div 
                        v-if="!selectedCategory || selectedCategory === 'anime'"
                        key="anime"
                        class="filter-card card-anime" 
                        :class="{ 'is-selected': selectedCategory === 'anime' }"
                        @click="selectedCategory !== 'anime' && selectCategory('anime')"
                    >
                        <!-- Close button -->
                        <button 
                            v-if="selectedCategory === 'anime'" 
                            class="close-button" 
                            @click.stop="selectedCategory = null"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div class="card-inner">
                            <span class="card-kanji">アニメ</span>
                            <h3 class="card-title">ANIME</h3>
                        </div>

                        <Transition name="fade">
                            <div v-if="selectedCategory === 'anime'" class="filter-content" @click.stop>
                                <div class="filter-controls">
                                    <label class="filter-label">BUSCAR </label>
                                    <div v-if="loadingAnimeGenres" class="loading-state">Cargando géneros...</div>
                                    <div v-else class="search-filter-row">
                                        <div class="search-box">
                                            <input 
                                                type="text" 
                                                v-model="searchQuery" 
                                                @input="handleSearch"
                                                placeholder="Buscar anime..." 
                                                class="neo-input"
                                            >
                                            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </div>
                                        <div class="select-box">
                                            <div class="neo-dropdown" :class="{ 'is-open': isGenreDropdownOpen }">
                                                <button class="neo-dropdown-toggle" @click="toggleGenreDropdown">
                                                    {{ animeGenres.find(g => g.mal_id === selectedGenre)?.name || 'Todos los géneros' }}
                                                    <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
                                                </button>
                                                <div v-if="isGenreDropdownOpen" class="neo-dropdown-menu">
                                                    <div class="dropdown-item" @click="selectGenre('')">Todos los géneros</div>
                                                    <div 
                                                        v-for="genre in animeGenres" 
                                                        :key="genre.mal_id" 
                                                        class="dropdown-item"
                                                        :class="{ 'is-active': selectedGenre === genre.mal_id }"
                                                        @click="selectGenre(genre.mal_id)"
                                                    >
                                                        {{ genre.name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Results display -->
                                <Transition name="list">
                                    <div v-if="animeStore.animeList.length > 0" class="results-grid">
                                        <article v-for="anime in animeStore.animeList" :key="anime.mal_id" class="result-card">
                                            <div class="result-image">
                                                <img :src="anime.images.webp?.image_url" :alt="anime.title">
                                                <span class="result-score" v-if="anime.score">★ {{ anime.score }}</span>
                                            </div>
                                            <div class="result-info">
                                                <h4 class="result-title">{{ anime.title }}</h4>
                                                <p class="result-type">{{ anime.type }} • {{ anime.episodes || '?' }} Eps</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div v-else-if="animeStore.isLoading" class="loading-results">
                                        Buscando...
                                    </div>
                                </Transition>
                            </div>
                        </Transition>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-view {
    min-height: 100vh;
    padding: var(--spacing-xxl) var(--spacing-lg);
    background-image: 
        linear-gradient(rgba(246, 247, 247, 0.9), rgba(255, 255, 255, 0.9)),
        url('/lineas4.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s ease;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.view-header {
    text-align: center;
    margin-bottom: var(--spacing-xxl);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-header.header-minimized {
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
    transform: scale(0.8);
}

.view-kanji {
    font-size: 4rem;
    color: var(--color-primary);
    margin: 0;
    line-height: 1;
    letter-spacing: 4px;
}

.view-title {
    font-size: var(--font-size-lg);
    color: var(--color-black-carbon);
    margin-top: var(--spacing-sm);
    letter-spacing: 2px;
}

.filter-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xl);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    align-items: flex-start;
}

/* When a category is selected, focus on it */
.filter-grid.has-selection {
    gap: var(--spacing-md);
}

.filter-card {
    flex: 1 1 calc(50% - var(--spacing-xl));
    min-width: 300px;
    background-color: var(--color-white-snow);
    border: var(--border-thick);
    padding: var(--spacing-xxl);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-height: 350px;
    overflow: hidden;
}

.filter-card.is-selected,
.filter-card.is-minimized {
    flex: 1 1 100%;
}

.filter-card:hover:not(.is-minimized):not(.is-selected) {
    transform: translate(-6px, -6px);
    box-shadow: 12px 12px 0 var(--color-black-carbon);
}

/* Minimized State - No longer used but kept for clean style reference if needed */
.filter-card.is-minimized {
    display: none;
}

.filter-card.is-minimized .card-inner {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.filter-card.is-minimized .card-kanji {
    font-size: 1.5rem;
    margin-bottom: 0;
}

.filter-card.is-minimized .card-title {
    font-size: 1rem;
}

/* Selected State (Expands) */
.filter-card.is-selected {
    min-height: 60vh;
    cursor: default;
    justify-content: flex-start;
    padding-top: 100px;
}

.filter-card.is-selected .card-inner {
    position: absolute;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    text-align: left;
    margin-bottom: 0;
    pointer-events: none;
}

.filter-card.is-selected .card-kanji {
    font-size: 1.8rem;
    margin-bottom: 0;
}

.filter-card.is-selected .card-title {
    font-size: 0.8rem;
    letter-spacing: 1px;
}

/* Close/Exit Button */
.close-button {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 44px;
    height: 44px;
    background: var(--color-white-snow);
    border: var(--border-thick);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 0;
}

.close-button:hover {
    background-color: var(--color-primary);
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.close-button svg {
    width: 20px;
    height: 20px;
    stroke: var(--color-black-carbon);
}

.close-button:hover svg {
    stroke: white;
}

.card-inner {
    text-align: center;
    transition: all 0.5s ease;
}

.card-kanji {
    display: block;
    font-size: 5rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
    line-height: 1;
    transition: all 0.5s ease;
}

.card-title {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: var(--font-weight-black);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 0;
    color: var(--color-black-carbon);
    transition: all 0.5s ease;
}

/* Content revealed when open */
.filter-content {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease forwards;
}

.filter-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: left;
}

.filter-label {
    font-family: var(--font-heading);
    font-size: var(--font-size-sm);
    color: var(--color-black-carbon);
    letter-spacing: 1px;
}

/* Custom Dropdown Styles */
.neo-dropdown {
    position: relative;
    width: 100%;
}

.neo-dropdown-toggle {
    width: 100%;
    padding: var(--spacing-md);
    background: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: var(--shadow-offset-sm);
    font-family: var(--font-heading);
    font-size: var(--font-size-md);
    text-transform: uppercase;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.neo-dropdown-toggle:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--color-black-carbon);
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

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Search and results styles */
.search-filter-row {
    display: flex;
    gap: var(--spacing-md);
    width: 100%;
}

.search-box {
    flex: 2;
    position: relative;
    display: flex;
    align-items: center;
}

.select-box {
    flex: 1;
}

.neo-input {
    width: 100%;
    padding: var(--spacing-md);
    padding-left: 50px;
    font-family: var(--font-heading);
    font-size: var(--font-size-md);
    background-color: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: var(--shadow-offset-sm);
    outline: none;
    transition: all 0.2s ease;
}

.neo-input:focus {
    border-color: var(--color-primary);
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.search-icon {
    position: absolute;
    left: var(--spacing-md);
    color: var(--color-black-carbon);
    pointer-events: none;
}

.results-grid {
    margin-top: var(--spacing-xl);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--spacing-lg);
    max-height: 500px;
    overflow-y: auto;
    padding-right: var(--spacing-sm);
}

/* Custom scrollbar for results */
.results-grid::-webkit-scrollbar {
    width: 8px;
}
.results-grid::-webkit-scrollbar-track {
    background: #f1f1f1;
    border: var(--border-thin);
}
.results-grid::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border: var(--border-thin);
}

.result-card {
    background: var(--color-white-snow);
    border: var(--border-thick);
    transition: all 0.2s ease-out;
    cursor: pointer;
    overflow: hidden;
    height: fit-content;
}

.result-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.result-image {
    position: relative;
    aspect-ratio: 2/3;
    overflow: hidden;
    border-bottom: var(--border-thick);
}

.result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.result-card:hover .result-image img {
    transform: scale(1.1);
}

.result-score {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--color-primary);
    color: white;
    padding: 4px 8px;
    font-size: 0.8rem;
    font-weight: bold;
    border: 2px solid var(--color-black-carbon);
    box-shadow: 2px 2px 0 var(--color-black-carbon);
}

.result-info {
    padding: var(--spacing-sm);
}

.result-title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--color-black-carbon);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
    line-height: 1.2;
}

.result-type {
    margin: 4px 0 0;
    font-size: 0.7rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.loading-results {
    margin-top: var(--spacing-xl);
    text-align: center;
    font-family: var(--font-heading);
    color: var(--color-primary);
    font-weight: bold;
}

.loading-state {
    font-family: var(--font-heading);
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    text-align: center;
    padding: var(--spacing-md);
}

/* Transition Animations */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
    opacity: 0;
    scale: 0.9;
}

.stagger-enter-active, .stagger-leave-active {
    transition: all 0.5s ease;
}
.stagger-enter-from, .stagger-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
.stagger-leave-active {
    position: absolute;
    width: 100%;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Specific colors/accents */
.card-manga .card-kanji {
    color: var(--color-primary);
}

.card-anime .card-kanji {
    color: #FF6B00;
}

@media (max-width: 768px) {
    .filter-grid {
        grid-template-columns: 1fr;
    }
    
    .filter-grid.has-selection {
        gap: var(--spacing-sm);
    }

    .view-kanji {
        font-size: 3rem;
    }
    
    .card-kanji {
        font-size: 3.5rem;
    }
    
    .filter-card {
        min-height: 250px;
    }

    .filter-card.is-minimized {
        min-height: 60px;
    }

    .filter-card.is-selected {
        min-height: 70vh;
    }
}
</style>