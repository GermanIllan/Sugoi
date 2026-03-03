<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAnimeStore } from '@/stores/animeStore';
import { useMangaStore } from '@/stores/mangaStore';
import { useSearchStore } from '@/stores/searchStore';
import { storeToRefs } from 'pinia';

const router = useRouter();

const animeStore = useAnimeStore();
const mangaStore = useMangaStore();
const searchStore = useSearchStore();

const { animeGenres, isLoadingGenres: loadingAnimeGenres } = storeToRefs(animeStore);
const { mangaGenres, isLoadingGenres: loadingMangaGenres } = storeToRefs(mangaStore);
const { 
    currentPage, 
    totalPages, 
    selectedCategory, 
    selectedGenre, 
    searchQuery,
    orderBy,
    sort
} = storeToRefs(searchStore);

const isGenreDropdownOpen = ref(false);
const isOrderDropdownOpen = ref(false);
const isClosing = ref(false);

const orderOptions = [
    { label: 'Ranking (Estrellas)', value: 'score' },
    { label: 'Más Moderno', value: 'start_date', sort: 'desc' },
    { label: 'Más Antiguo', value: 'start_date', sort: 'asc' },
    { label: 'Más Vistos', value: 'popularity', sort: 'asc' },
    { label: 'Menos Vistos', value: 'popularity', sort: 'desc' }
];

const currentOrderLabel = computed(() => {
    const option = orderOptions.find(o => o.value === orderBy.value && (!o.sort || o.sort === sort.value));
    return option ? option.label : 'Ordenar por';
});

onMounted(() => {
    animeStore.fetchAnimeGenres();
    mangaStore.fetchMangaGenres();
    
    // If returning from description, we might want to refresh if the list is empty but we have a query
    if (searchQuery.value || selectedGenre.value) {
        if (selectedCategory.value === 'anime' && animeStore.animeList.length === 0) {
            handleSearch(currentPage.value);
        } else if (selectedCategory.value === 'manga' && mangaStore.mangaList.length === 0) {
            handleSearch(currentPage.value);
        }
    }
});

const selectCategory = (category) => {
    if (selectedCategory.value === category) {
        selectedCategory.value = null;
    } else {
        selectedCategory.value = category;
        selectedGenre.value = ''; // Reset genre when switching category
        searchQuery.value = ''; // Reset search
        currentPage.value = 1;
        isGenreDropdownOpen.value = false;
        handleSearch(1, true); // Call search immediately to show content
    }
};

const toggleGenreDropdown = () => {
    isGenreDropdownOpen.value = !isGenreDropdownOpen.value;
};

const selectGenre = (genreId) => {
    selectedGenre.value = genreId;
    isGenreDropdownOpen.value = false;
    currentPage.value = 1; 
};

const closeCategory = () => {
    isClosing.value = true;
    
    setTimeout(() => {
        selectedCategory.value = null;
        isClosing.value = false;
        searchQuery.value = '';
        selectedGenre.value = '';
        orderBy.value = '';
        sort.value = 'desc';
        isGenreDropdownOpen.value = false;
        isOrderDropdownOpen.value = false;
    }, 500);
};

const selectOrder = (option) => {
    orderBy.value = option.value;
    if (option.sort) sort.value = option.sort;
    isOrderDropdownOpen.value = false;
    handleSearch();
};


watch([selectedGenre, orderBy, sort], () => {
    handleSearch();
});

let searchTimeout = null;

const handleSearch = (page = 1, immediate = false) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    
    // If it's a pagination change or explicitly immediate, we want it immediate
    if ((typeof page === 'number' && page !== 1) || immediate) {
        performSearch(page);
    } else {
        // Debounce for typing
        searchTimeout = setTimeout(() => {
            performSearch(1);
        }, 500);
    }
};

const performSearch = async (page = 1) => {
    currentPage.value = typeof page === 'number' ? page : 1;
    const query = searchQuery.value.trim();
    const genre = selectedGenre.value ? selectedGenre.value.toString() : '';
    const limit = 25; 

    if (!query && !genre && !orderBy.value) {
        const genres = selectedCategory.value === 'anime' ? animeGenres.value : mangaGenres.value;
        if (genres.length > 0) {
            const randomGenre = genres[Math.floor(Math.random() * genres.length)].mal_id;
            if (selectedCategory.value === 'anime') {
                await animeStore.fetchAnimeList('', randomGenre.toString(), 1, limit, orderBy.value, sort.value);
                totalPages.value = animeStore.pagination?.last_visible_page || 1;
            } else {
                await mangaStore.fetchMangaList('', randomGenre.toString(), 1, limit, orderBy.value, sort.value);
                totalPages.value = mangaStore.pagination?.last_visible_page || 1;
            }
            filterDuplicates();
            return;
        }
        if (selectedCategory.value === 'anime') animeStore.animeList = [];
        if (selectedCategory.value === 'manga') mangaStore.mangaList = [];
        totalPages.value = 1;
        return;
    }

    if (selectedCategory.value === 'anime') {
        if (query && /^\d+$/.test(query)) {
            await animeStore.fetchAnimeById(parseInt(query));
            if (animeStore.animeDetail) {
                // @ts-ignore
                animeStore.animeList = [animeStore.animeDetail];
                totalPages.value = 1;
            }
        } else {
            // @ts-ignore
            await animeStore.fetchAnimeList(query, genre, currentPage.value, limit, orderBy.value, sort.value);
            totalPages.value = animeStore.pagination?.last_visible_page || 1;
        }
    } else if (selectedCategory.value === 'manga') {
        if (query && /^\d+$/.test(query)) {
            await mangaStore.fetchMangaById(parseInt(query));
            if (mangaStore.mangaDetail) {
                // @ts-ignore
                mangaStore.mangaList = [mangaStore.mangaDetail];
                totalPages.value = 1;
            }
        } else {
            await mangaStore.fetchMangaList(query, genre, currentPage.value, limit, orderBy.value, sort.value);
            totalPages.value = mangaStore.pagination?.last_visible_page || 1;
        }
    }
    filterDuplicates();
};

const filterDuplicates = () => {
    if (selectedCategory.value === 'anime') {
        const seen = new Set();
        animeStore.animeList = animeStore.animeList.filter(item => {
            if (seen.has(item.mal_id)) return false;
            seen.add(item.mal_id);
            return true;
        });
    } else {
        const seen = new Set();
        mangaStore.mangaList = mangaStore.mangaList.filter(item => {
            if (seen.has(item.mal_id)) return false;
            seen.add(item.mal_id);
            return true;
        });
    }
};

const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    handleSearch(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagesToShow = (() => {
    return (current, total) => {
        const pages = [];
        const start = Math.max(1, current - 2);
        const end = Math.min(total, start + 4);
        const adjustedStart = Math.max(1, end - 4);
        for (let i = adjustedStart; i <= end; i++) pages.push(i);
        return pages;
    };
})();

const goToDetail = (type, id) => {
    router.push({ name: 'description', params: { type, id: id.toString() } });
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
                        v-if="(!selectedCategory || selectedCategory === 'manga') && !isClosing"
                        key="manga"
                        class="filter-card card-manga" 
                        :class="{ 'is-selected': selectedCategory === 'manga' }"
                        @click="selectedCategory !== 'manga' && selectCategory('manga')"
                    >
                        <!-- Close button -->
                        <button 
                            v-if="selectedCategory === 'manga'" 
                            class="close-button" 
                            @click.stop="closeCategory"
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
                                <div class="filter-controls-row">
                                    <!-- Search Group -->
                                    <div class="filter-group search-group">
                                        <label class="filter-label">BUSCAR </label>
                                        <div class="search-box-container">
                                            <div class="order-box-link">
                                                <input 
                                                    type="text" 
                                                    v-model="searchQuery" 
                                                    @input="handleSearch"
                                                    placeholder="Buscar manga..." 
                                                    class="neo-input"
                                                >
                                                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
                                                        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
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

                                    <!-- Categories Group -->
                                    <div class="filter-group genre-group">
                                        <div v-if="loadingMangaGenres" class="loading-state">Cargando...</div>
                                        <template v-else>
                                            <label class="filter-label">CATEGORÍAS</label>
                                            <div class="neo-dropdown" :class="{ 'is-open': isGenreDropdownOpen }">
                                                <div class="order-box-link">
                                                    <button class="neo-dropdown-toggle" @click="toggleGenreDropdown">
                                                        {{ mangaGenres.find(g => g.mal_id === selectedGenre)?.name || 'Todas' }}
                                                        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
                                                    </button>
                                                </div>
                                                <div v-if="isGenreDropdownOpen" class="neo-dropdown-menu">
                                                    <div class="dropdown-item" @click="selectGenre('')">Todas las categorías</div>
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
                                        </template>
                                    </div>

                                </div>

                                <!-- Results display -->
                                <Transition name="list">
                                    <div v-if="mangaStore.mangaList.length > 0">
                                        <div class="results-grid">
                                            <article 
                                                v-for="manga in mangaStore.mangaList" 
                                                :key="manga.mal_id" 
                                                class="result-card"
                                                @click="goToDetail('manga', manga.mal_id)"
                                            >
                                                <div class="result-image">
                                                    <img :src="manga.images.webp?.image_url" :alt="manga.title">
                                                    <span class="result-score" v-if="manga.score">★ {{ manga.score }}</span>
                                                </div>
                                                <div class="result-info">
                                                    <h4 class="result-title">{{ manga.title }}</h4>
                                                    <p class="result-type">{{ manga.type }} • {{ manga.chapters || '?' }} Ch</p>
                                                    <p class="result-synopsis">{{ manga.synopsis || 'Sin descripción disponible.' }}</p>
                                                </div>
                                            </article>
                                        </div>

                                        <!-- Pagination -->
                                        <div v-if="totalPages > 1" class="pagination-container">
                                            <button 
                                                class="pagination-btn" 
                                                :disabled="currentPage === 1"
                                                @click="changePage(currentPage - 1)"
                                            >
                                                &lsaquo;
                                            </button>
                                            
                                            <button 
                                                v-for="page in pagesToShow(currentPage, totalPages)" 
                                                :key="page"
                                                class="pagination-btn"
                                                :class="{ 'is-active': page === currentPage }"
                                                @click="changePage(page)"
                                            >
                                                {{ page }}
                                            </button>
                                            
                                            <button 
                                                class="pagination-btn" 
                                                :disabled="currentPage === totalPages"
                                                @click="changePage(currentPage + 1)"
                                            >
                                                &rsaquo;
                                            </button>
                                        </div>
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
                        v-if="(!selectedCategory || selectedCategory === 'anime') && !isClosing"
                        key="anime"
                        class="filter-card card-anime" 
                        :class="{ 'is-selected': selectedCategory === 'anime' }"
                        @click="selectedCategory !== 'anime' && selectCategory('anime')"
                    >
                        <!-- Close button -->
                        <button 
                            v-if="selectedCategory === 'anime'" 
                            class="close-button" 
                            @click.stop="closeCategory"
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
                                <div class="filter-controls-row">
                                    <!-- Search Group -->
                                    <div class="filter-group search-group">
                                        <label class="filter-label">BUSCAR </label>
                                        <div class="search-box-container">
                                            <div class="order-box-link">
                                                <input 
                                                    type="text" 
                                                    v-model="searchQuery" 
                                                    @input="handleSearch"
                                                    placeholder="Buscar anime..." 
                                                    class="neo-input"
                                                >
                                                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
                                                        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
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

                                    <!-- Categories Group -->
                                    <div class="filter-group genre-group">
                                        <div v-if="loadingAnimeGenres" class="loading-state">Cargando...</div>
                                        <template v-else>
                                            <label class="filter-label">CATEGORÍAS</label>
                                            <div class="neo-dropdown" :class="{ 'is-open': isGenreDropdownOpen }">
                                                <div class="order-box-link">
                                                    <button class="neo-dropdown-toggle" @click="toggleGenreDropdown">
                                                        {{ animeGenres.find(g => g.mal_id === selectedGenre)?.name || 'Todas' }}
                                                        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 12 0-6 6z" fill="currentColor"/></svg>
                                                    </button>
                                                </div>
                                                <div v-if="isGenreDropdownOpen" class="neo-dropdown-menu">
                                                    <div class="dropdown-item" @click="selectGenre('')">Todas las categorías</div>
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
                                        </template>
                                    </div>

                                </div>

                                <!-- Results display -->
                                <Transition name="list">
                                    <div v-if="animeStore.animeList.length > 0">
                                        <div class="results-grid">
                                            <article 
                                                v-for="anime in animeStore.animeList" 
                                                :key="anime.mal_id" 
                                                class="result-card"
                                                @click="goToDetail('anime', anime.mal_id)"
                                            >
                                                <div class="result-image">
                                                    <img :src="anime.images.webp?.image_url" :alt="anime.title">
                                                    <span class="result-score" v-if="anime.score">★ {{ anime.score }}</span>
                                                </div>
                                                <div class="result-info">
                                                    <h4 class="result-title">{{ anime.title }}</h4>
                                                    <p class="result-type">{{ anime.type }} • {{ anime.episodes || '?' }} Eps</p>
                                                    <p class="result-synopsis">{{ anime.synopsis || 'Sin descripción disponible.' }}</p>
                                                </div>
                                            </article>
                                        </div>

                                        <!-- Pagination -->
                                        <div v-if="totalPages > 1" class="pagination-container">
                                            <button 
                                                class="pagination-btn" 
                                                :disabled="currentPage === 1"
                                                @click="changePage(currentPage - 1)"
                                            >
                                                &lsaquo;
                                            </button>
                                            
                                            <button 
                                                v-for="page in pagesToShow(currentPage, totalPages)" 
                                                :key="page"
                                                class="pagination-btn"
                                                :class="{ 'is-active': page === currentPage }"
                                                @click="changePage(page)"
                                            >
                                                {{ page }}
                                            </button>
                                            
                                            <button 
                                                class="pagination-btn" 
                                                :disabled="currentPage === totalPages"
                                                @click="changePage(currentPage + 1)"
                                            >
                                                &rsaquo;
                                            </button>
                                        </div>
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
        url('@/assets/images/image/lineas4.jpg');
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
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-height: 350px;
    overflow: hidden;
}

.filter-card.is-selected,
.filter-card.is-minimized {
    flex: 1 1 100%;
}

/* Stagger Animations */
.stagger-move,
.stagger-enter-active,
.stagger-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.stagger-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.stagger-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.stagger-leave-active {
    position: absolute;
}

/* Fade for content */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
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
    min-height: calc(100vh - 200px);
    height: auto;
    cursor: default;
    justify-content: flex-start;
    padding-top: 100px;
    overflow: visible; /* Allow content like dropdowns/pagination to not be clipped if needed, though card is huge */
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
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
    transition: all 0.2s ease;
}

.neo-dropdown-toggle:hover {
    /* Hover handled by parent .order-box-link */
    transform: none;
    box-shadow: none;
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

.extra-filters-row {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.toggle-filter-btn {
    flex: 1;
    background: var(--color-white-snow);
    border: var(--border-thick);
    font-family: var(--font-heading);
    font-weight: bold;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
}

.toggle-filter-btn.is-active {
    background: var(--color-primary);
    color: white;
    box-shadow: 4px 4px 0 var(--color-black-carbon);
    transform: translate(-2px, -2px);
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Search and results styles */
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

.order-controls-combined {
    display: flex;
    align-items: stretch;
    width: 100%;
    position: relative;
    z-index: 50;
    gap: var(--spacing-xs);
}

.order-controls-combined .neo-dropdown {
    flex: 1;
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

.order-controls-combined .neo-dropdown-toggle {
    border: none;
    box-shadow: none;
    height: 60px;
    width: 100%;
    background: transparent;
}

.toggle-filter-btn.mini {
    flex: 0 0 80px;
    padding: 0;
    font-size: 0.9rem;
    font-weight: 900;
    background: var(--color-white-snow);
    border: var(--border-thick);
    box-shadow: var(--shadow-offset-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
}

.toggle-filter-btn.mini:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.toggle-filter-btn.mini.is-active {
    background: var(--color-primary);
    color: white;
}

.search-box-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
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

/* Ensure genre dropdown toggle also matches height */
.genre-group .neo-dropdown-toggle {
    height: 60px;
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
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
}

@media (max-width: 1200px) {
    .results-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media (max-width: 992px) {
    .results-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .filter-controls-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
    }
    .search-group { grid-column: span 2; }
}
@media (max-width: 640px) {
    .results-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .filter-controls-row {
        grid-template-columns: 1fr;
    }
    .search-group, .order-group, .genre-group { grid-column: span 1; }
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

.result-card {
    background: var(--color-white-snow);
    border: var(--border-thick);
    transition: all 0.2s ease-out;
    cursor: pointer;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
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
    flex: 1;
    display: flex;
    flex-direction: column;
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

.result-synopsis {
    margin: 8px 0 0;
    font-size: 0.75rem;
    color: #444;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 3;
    line-height: 1.4;
    font-family: var(--font-body);
    flex-grow: 1;
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

@media (max-width: 992px) {
    .filter-controls-row {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
    }

    .filter-group {
        width: 100%;
    }

    .filter-card.is-selected {
        padding-top: 140px;
    }
}

@media (max-width: 768px) {
    .filter-grid {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
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
        min-height: 200px;
        padding: var(--spacing-lg);
        flex: 1 1 auto;
        width: 100%;
    }

    .filter-card.is-minimized {
        min-height: 60px;
    }

    .filter-card.is-selected {
        min-height: 70vh;
        padding-top: 140px;
        padding-left: var(--spacing-md);
        padding-right: var(--spacing-md);
    }
}
</style>