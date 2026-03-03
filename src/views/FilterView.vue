<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAnimeStore } from '@/stores/animeStore';
import { useMangaStore } from '@/stores/mangaStore';
import { useSearchStore } from '@/stores/searchStore';
import { useScrollToTopOnUpdate } from '@/composables/useScroll';

// Components
import FilterCategoryCard from '@/components/Filter/FilterCategoryCard.vue';
import FilterControls from '@/components/Filter/FilterControls.vue';
import FilterResultsGrid from '@/components/Filter/FilterResultsGrid.vue';
import scaleCat from '@/assets/images/gif/cleannigcat.gif';

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

// Global Auto-scroll on page change
useScrollToTopOnUpdate(currentPage);

const isClosing = ref(false);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

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

const selectCategory = (category: 'anime' | 'manga') => {
    if (selectedCategory.value === category) {
        selectedCategory.value = null;
    } else {
        selectedCategory.value = category;
        selectedGenre.value = ''; // Reset genre when switching category
        searchQuery.value = ''; // Reset search
        currentPage.value = 1;
        handleSearch(1, true); // Call search immediately to show content
    }
};

const closeCategory = () => {
    isClosing.value = true;
    
    setTimeout(() => {
        selectedCategory.value = null;
        isClosing.value = false;
        searchQuery.value = '';
        selectedGenre.value = '';
        orderBy.value = 'start_date';
        sort.value = 'desc';
    }, 500);
};

const handleOrderChange = (option: { value: string, sort?: 'desc' | 'asc' }) => {
    orderBy.value = option.value;
    if (option.sort) {
        sort.value = option.sort;
    }
    handleSearch();
};

watch([selectedGenre], () => {
    handleSearch();
});

const handleSearch = (page: number = 1, immediate: boolean = false) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if ((typeof page === 'number' && page !== 1) || immediate) {
        performSearch(page);
    } else {
        searchTimeout = setTimeout(() => {
            performSearch(1);
        }, 500);
    }
};

const performSearch = async (page: number = 1) => {
    currentPage.value = typeof page === 'number' ? page : 1;
    const query = searchQuery.value.trim();
    const genre = selectedGenre.value ? selectedGenre.value.toString() : '';
    const limit = 15; 

    if (!query && !genre && !orderBy.value) {
        const genres = selectedCategory.value === 'anime' ? animeGenres.value : mangaGenres.value;
        if (genres.length > 0) {
            const randomIndex = Math.floor(Math.random() * genres.length);
            const randomGenreObj = genres[randomIndex];
            
            if (randomGenreObj) {
                const randomGenre = randomGenreObj.mal_id;
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
                animeStore.animeList = [animeStore.animeDetail];
                totalPages.value = 1;
            }
        } else {
            await animeStore.fetchAnimeList(query, genre, currentPage.value, limit, orderBy.value, sort.value);
            totalPages.value = animeStore.pagination?.last_visible_page || 1;
        }
    } else if (selectedCategory.value === 'manga') {
        if (query && /^\d+$/.test(query)) {
            await mangaStore.fetchMangaById(parseInt(query));
            if (mangaStore.mangaDetail) {
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

const changePage = (page: number) => {
    handleSearch(page);
};

const goToDetail = (payload: { type: string, id: number }) => {
    router.push({ name: 'description', params: { type: payload.type, id: payload.id.toString() } });
};
</script>

<template>
    <div class="filter-view">
        <!-- Hanging Cat -->
        <img v-if="!selectedCategory" :src="scaleCat" alt="Scaling Cat" class="hanging-cat" aria-hidden="true" />

        <div class="container" :class="{ 'container-wide': !!selectedCategory }">
            <header class="view-header" :class="{ 'header-minimized': selectedCategory }">
                <h1 class="view-kanji">フィルター</h1>
                <h2 class="view-title">FILTRAR POR CATEGORÍA</h2>
            </header>

            <div class="filter-grid" :class="{ 'has-selection': selectedCategory }">
                <TransitionGroup name="stagger">
                    <!-- Manga Card -->
                    <FilterCategoryCard
                        v-if="(!selectedCategory || selectedCategory === 'manga') && !isClosing"
                        key="manga"
                        category="manga"
                        :isSelected="selectedCategory === 'manga'"
                        :isClosing="isClosing"
                        kanji="漫画"
                        title="MANGA"
                        @select="selectCategory('manga')"
                        @close="closeCategory"
                    >
                        <FilterControls 
                            v-model:searchQuery="searchQuery"
                            v-model:selectedGenre="selectedGenre"
                            :orderBy="orderBy"
                            :sort="sort"
                            :genres="mangaGenres"
                            :isLoadingGenres="loadingMangaGenres"
                            placeholder="Buscar manga..."
                            @update:order="handleOrderChange"
                            @search="handleSearch(1)"
                        />

                        <FilterResultsGrid 
                            :items="mangaStore.mangaList"
                            category="manga"
                            :isLoading="mangaStore.isLoading"
                            :error="mangaStore.error"
                            :currentPage="currentPage"
                            :totalPages="totalPages"
                            @changePage="changePage"
                            @goToDetail="goToDetail"
                        />
                    </FilterCategoryCard>

                    <!-- Anime Card -->
                    <FilterCategoryCard
                        v-if="(!selectedCategory || selectedCategory === 'anime') && !isClosing"
                        key="anime"
                        category="anime"
                        :isSelected="selectedCategory === 'anime'"
                        :isClosing="isClosing"
                        kanji="アニメ"
                        title="ANIME"
                        @select="selectCategory('anime')"
                        @close="closeCategory"
                    >
                        <FilterControls 
                            v-model:searchQuery="searchQuery"
                            v-model:selectedGenre="selectedGenre"
                            :orderBy="orderBy"
                            :sort="sort"
                            :genres="animeGenres"
                            :isLoadingGenres="loadingAnimeGenres"
                            placeholder="Buscar anime..."
                            @update:order="handleOrderChange"
                            @search="handleSearch(1)"
                        />

                        <FilterResultsGrid 
                            :items="animeStore.animeList"
                            category="anime"
                            :isLoading="animeStore.isLoading"
                            :error="animeStore.error"
                            :currentPage="currentPage"
                            :totalPages="totalPages"
                            @changePage="changePage"
                            @goToDetail="goToDetail"
                        />
                    </FilterCategoryCard>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-view {
    min-height: 100vh;
    padding: var(--spacing-xxl) var(--spacing-xs);
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
    padding: 0 var(--spacing-md);
    transition: max-width 0.5s ease;
}

.container.container-wide {
    max-width: 1700px;
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

.filter-grid.has-selection {
    gap: var(--spacing-md);
}

/* Transitions for TransitionGroup */
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

.stagger-move {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
    .view-kanji {
        font-size: 3rem;
    }
}

.hanging-cat {
    position: absolute;
    bottom: 0;
    left: 70%;
    width: 200px;
    height: auto;
    z-index: 5; /* Detrás del footer (z-index: 20) */
    pointer-events: none;
    transform: translateY(50%); /* Asomando la mitad */
    /* Mantenemos una ligera animación para que se note vivo */
    animation: cat-bounce 2s ease-in-out infinite alternate;
}

@keyframes cat-bounce {
    from { transform: translateY(45%) translateX(0); }
    to { transform: translateY(55%) translateX(5px); }
}
</style>
```