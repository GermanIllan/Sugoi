import { defineStore } from 'pinia';
import { ref } from 'vue';
import { animeService } from '@/services/animeService';
import type { Anime, PaginationInfo, AnimeSearchParams } from '@/types/anime';
import type { Genre } from '@/types/genre';
import type { News } from '@/types/news';
import type { Recommendation } from '@/types/recommendation';
import type { ApiError } from '@/services/axiosClient';

/**
 * Pinia Store for managing Anime search state and pagination.
 */
export const useAnimeStore = defineStore('anime', () => {
    // State
    const animeList = ref<Anime[]>([]);
    const pagination = ref<PaginationInfo | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const currentSearchQuery = ref<string>('');

    // Detail State
    const animeDetail = ref<Anime | null>(null);
    const isDetailLoading = ref<boolean>(false);
    const detailError = ref<string | null>(null);

    // Ranking State
    const animeRanking = ref<Anime[]>([]);
    const rankingPagination = ref<PaginationInfo | null>(null);
    const loadingRanking = ref<boolean>(false);
    const rankingError = ref<string | null>(null);

    // Genre State
    const animeGenres = ref<Genre[]>([]);
    const isLoadingGenres = ref<boolean>(false);
    const genresError = ref<string | null>(null);

    // News State
    const animeNews = ref<News[]>([]);
    const isLoadingNews = ref<boolean>(false);
    const newsError = ref<string | null>(null);

    // Recommendation State
    const animeRecommendations = ref<Recommendation[]>([]);
    const isLoadingRecommendations = ref<boolean>(false);
    const recommendationsError = ref<string | null>(null);

    // Upcoming State
    const upcomingAnime = ref<Anime[]>([]);
    const upcomingPagination = ref<PaginationInfo | null>(null);
    const isLoadingUpcoming = ref<boolean>(false);
    const upcomingError = ref<string | null>(null);

    // Actions

    /**
     * Fetch an initial list of Animes. 
     * Resets the previous list and error state.
     * @param query - The search string to look for.
     */
    const fetchAnimeList = async (query: string = '') => {
        isLoading.value = true;
        error.value = null;
        currentSearchQuery.value = query;

        const params: AnimeSearchParams = {
            q: query,
            page: 1,
            // You can add more default params here if needed, like limit: 24
        };

        try {
            const response = await animeService.getAnimeList(params);
            animeList.value = response.data;
            pagination.value = response.pagination;
        } catch (err: any) {
            const apiError = err as ApiError;
            error.value = apiError.message || 'Error fetching animes';
            animeList.value = []; // Clear list on error, or keep previous state? Usually clear.
            pagination.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Loads the next page of results and appends it to the existing animeList.
     * Only works if not currently loading and there is a next page available.
     */
    const loadMoreAnime = async () => {
        if (isLoading.value) return;
        if (!pagination.value || !pagination.value.has_next_page) return;

        isLoading.value = true;
        error.value = null;

        const nextPage = pagination.value.current_page + 1;
        const params: AnimeSearchParams = {
            q: currentSearchQuery.value,
            page: nextPage,
        };

        try {
            const response = await animeService.getAnimeList(params);

            // Concatenate the new data to the existing list
            animeList.value = [...animeList.value, ...response.data];

            // Update the pagination info
            pagination.value = response.pagination;
        } catch (err: any) {
            const apiError = err as ApiError;
            error.value = apiError.message || 'Error loading more animes';
            // Do NOT clear list here, we want to keep what we already loaded
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Fetch a single Anime by ID and store it in animeDetail.
     * @param id - The mal_id of the anime.
     */
    const fetchAnimeById = async (id: number) => {
        isDetailLoading.value = true;
        detailError.value = null;

        try {
            const response = await animeService.getAnimeById(id);
            animeDetail.value = response.data;
        } catch (err: any) {
            const apiError = err as ApiError;
            detailError.value = apiError.message || 'Error fetching anime detail';
            animeDetail.value = null;
        } finally {
            isDetailLoading.value = false;
        }
    };

    /**
     * Fetch the top anime ranking (first page).
     */
    const fetchAnimeRanking = async () => {
        loadingRanking.value = true;
        rankingError.value = null;

        try {
            const response = await animeService.getAnimeRanking(1);
            animeRanking.value = response.data;
            rankingPagination.value = response.pagination;
        } catch (err: any) {
            const apiError = err as ApiError;
            rankingError.value = apiError.message || 'Error fetching ranking';
            animeRanking.value = [];
            rankingPagination.value = null;
        } finally {
            loadingRanking.value = false;
        }
    };

    /**
     * Load more anime for the ranking (next pages).
     */
    const loadMoreRanking = async () => {
        if (loadingRanking.value) return;
        if (!rankingPagination.value || !rankingPagination.value.has_next_page) return;

        loadingRanking.value = true;
        rankingError.value = null;

        const nextPage = rankingPagination.value.current_page + 1;

        try {
            const response = await animeService.getAnimeRanking(nextPage);
            animeRanking.value = [...animeRanking.value, ...response.data];
            rankingPagination.value = response.pagination;
        } catch (err: any) {
            const apiError = err as ApiError;
            rankingError.value = apiError.message || 'Error loading more ranking';
        } finally {
            loadingRanking.value = false;
        }
    };

    /**
     * Fetch the list of anime genres.
     */
    const fetchAnimeGenres = async () => {
        isLoadingGenres.value = true;
        genresError.value = null;

        try {
            const response = await animeService.getAnimeGenres();
            animeGenres.value = response.data;
        } catch (err: any) {
            const apiError = err as ApiError;
            genresError.value = apiError.message || 'Error fetching genres';
            animeGenres.value = [];
        } finally {
            isLoadingGenres.value = false;
        }
    };

    /**
     * Fetch news for a specific anime.
     * @param id - mal_id of the anime.
     */
    const fetchAnimeNews = async (id: number) => {
        isLoadingNews.value = true;
        newsError.value = null;

        try {
            const response = await animeService.getAnimeNews(id);
            animeNews.value = response.data;
        } catch (err: any) {
            const apiError = err as ApiError;
            newsError.value = apiError.message || 'Error fetching news';
            animeNews.value = [];
        } finally {
            isLoadingNews.value = false;
        }
    };

    /**
     * Fetch global anime recommendations.
     */
    const fetchAnimeRecommendations = async () => {
        isLoadingRecommendations.value = true;
        recommendationsError.value = null;

        try {
            const response = await animeService.getAnimeRecommendations();
            animeRecommendations.value = response.data;
        } catch (err: any) {
            const apiError = err as ApiError;
            recommendationsError.value = apiError.message || 'Error fetching recommendations';
            animeRecommendations.value = [];
        } finally {
            isLoadingRecommendations.value = false;
        }
    };

    /**
     * Fetch upcoming anime season.
     */
    const fetchUpcomingSeason = async () => {
        isLoadingUpcoming.value = true;
        upcomingError.value = null;

        try {
            const response = await animeService.getUpcomingSeason(1);
            upcomingAnime.value = response.data;
            upcomingPagination.value = response.pagination;
        } catch (err: any) {
            const apiError = err as ApiError;
            upcomingError.value = apiError.message || 'Error fetching upcoming anime';
            upcomingAnime.value = [];
            upcomingPagination.value = null;
        } finally {
            isLoadingUpcoming.value = false;
        }
    };

    return {
        // State
        animeList,
        pagination,
        isLoading,
        error,
        currentSearchQuery,
        animeDetail,
        isDetailLoading,
        detailError,
        animeRanking,
        rankingPagination,
        loadingRanking,
        rankingError,
        animeGenres,
        isLoadingGenres,
        genresError,
        animeNews,
        isLoadingNews,
        newsError,
        animeRecommendations,
        isLoadingRecommendations,
        recommendationsError,
        upcomingAnime,
        upcomingPagination,
        isLoadingUpcoming,
        upcomingError,

        // Actions
        fetchAnimeList,
        loadMoreAnime,
        fetchAnimeById,
        fetchAnimeRanking,
        loadMoreRanking,
        fetchAnimeGenres,
        fetchAnimeNews,
        fetchAnimeRecommendations,
        fetchUpcomingSeason
    };
});
