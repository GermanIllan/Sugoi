import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mangaService } from '@/services/mangaService';
import type { Manga, MangaSearchParams } from '@/types/manga';
import type { PaginationInfo } from '@/types/anime';
import type { Genre } from '@/types/genre';
import type { News } from '@/types/news';
import type { Recommendation } from '@/types/recommendation';
import type { ApiError } from '@/services/axiosClient';

/**
 * Pinia Store for managing Manga state.
 */
export const useMangaStore = defineStore('manga', () => {
    // Search State
    const mangaList = ref<Manga[]>([]);
    const pagination = ref<PaginationInfo | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const currentSearchQuery = ref<string>('');

    // Detail State
    const mangaDetail = ref<Manga | null>(null);
    const isDetailLoading = ref<boolean>(false);
    const detailError = ref<string | null>(null);

    // Ranking State
    const mangaRanking = ref<Manga[]>([]);
    const rankingPagination = ref<PaginationInfo | null>(null);
    const loadingRanking = ref<boolean>(false);
    const rankingError = ref<string | null>(null);

    // Genre State
    const mangaGenres = ref<Genre[]>([]);
    const isLoadingGenres = ref<boolean>(false);
    const genresError = ref<string | null>(null);

    // News State
    const mangaNews = ref<News[]>([]);
    const isLoadingNews = ref<boolean>(false);
    const newsError = ref<string | null>(null);

    // Recommendation State
    const mangaRecommendations = ref<Recommendation[]>([]);
    const isLoadingRecommendations = ref<boolean>(false);
    const recommendationsError = ref<string | null>(null);

    // Actions

    /**
     * Fetch initial manga list.
     */
    const fetchMangaList = async (
        query: string = '',
        genres: string = '',
        page: number = 1,
        limit: number = 15,
        orderBy: string = '',
        sort: 'desc' | 'asc' = 'desc'
    ) => {
        isLoading.value = true;
        error.value = null;
        currentSearchQuery.value = query;

        try {
            const response = await mangaService.getMangaList({
                q: query,
                page: page,
                limit: limit,
                genres: genres || undefined,
                order_by: orderBy as any || undefined,
                sort: sort
            });
            mangaList.value = response.data;
            pagination.value = response.pagination;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            error.value = apiError.message || 'Error fetching mangas';
            mangaList.value = [];
            pagination.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Load more manga (pagination).
     */
    const loadMoreManga = async () => {
        if (isLoading.value || !pagination.value?.has_next_page) return;

        isLoading.value = true;
        const nextPage = (pagination.value.current_page || 1) + 1;

        try {
            const response = await mangaService.getMangaList({ q: currentSearchQuery.value, page: nextPage });
            mangaList.value = [...mangaList.value, ...response.data];
            pagination.value = response.pagination;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            error.value = apiError.message || 'Error loading more mangas';
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Fetch manga by ID.
     */
    const fetchMangaById = async (id: number) => {
        isDetailLoading.value = true;
        detailError.value = null;

        try {
            const response = await mangaService.getMangaById(id);
            mangaDetail.value = response.data;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            detailError.value = apiError.message || 'Error fetching manga detail';
            mangaDetail.value = null;
        } finally {
            isDetailLoading.value = false;
        }
    };

    /**
     * Fetch manga ranking.
     */
    const fetchMangaRanking = async () => {
        loadingRanking.value = true;
        rankingError.value = null;

        try {
            const response = await mangaService.getMangaRanking(1);
            mangaRanking.value = response.data;
            rankingPagination.value = response.pagination;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            rankingError.value = apiError.message || 'Error fetching ranking';
            mangaRanking.value = [];
            rankingPagination.value = null;
        } finally {
            loadingRanking.value = false;
        }
    };

    /**
     * Fetch manga genres.
     */
    const fetchMangaGenres = async () => {
        isLoadingGenres.value = true;
        genresError.value = null;

        try {
            const response = await mangaService.getMangaGenres();
            mangaGenres.value = response.data;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            genresError.value = apiError.message || 'Error fetching genres';
            mangaGenres.value = [];
        } finally {
            isLoadingGenres.value = false;
        }
    };

    /**
     * Fetch news for a specific manga.
     * @param id - mal_id of the manga.
     */
    const fetchMangaNews = async (id: number) => {
        isLoadingNews.value = true;
        newsError.value = null;

        try {
            const response = await mangaService.getMangaNews(id);
            mangaNews.value = response.data;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            newsError.value = apiError.message || 'Error fetching news';
            mangaNews.value = [];
        } finally {
            isLoadingNews.value = false;
        }
    };

    /**
     * Fetch global manga recommendations.
     */
    const fetchMangaRecommendations = async () => {
        isLoadingRecommendations.value = true;
        recommendationsError.value = null;

        try {
            const response = await mangaService.getMangaRecommendations();
            mangaRecommendations.value = response.data;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            recommendationsError.value = apiError.message || 'Error fetching recommendations';
            mangaRecommendations.value = [];
        } finally {
            isLoadingRecommendations.value = false;
        }
    };

    return {
        mangaList,
        pagination,
        isLoading,
        error,
        currentSearchQuery,
        mangaDetail,
        isDetailLoading,
        detailError,
        mangaRanking,
        rankingPagination,
        loadingRanking,
        rankingError,
        mangaGenres,
        isLoadingGenres,
        genresError,
        mangaNews,
        isLoadingNews,
        newsError,
        mangaRecommendations,
        isLoadingRecommendations,
        recommendationsError,

        fetchMangaList,
        loadMoreManga,
        fetchMangaById,
        fetchMangaRanking,
        fetchMangaGenres,
        fetchMangaNews,
        fetchMangaRecommendations
    };
});
