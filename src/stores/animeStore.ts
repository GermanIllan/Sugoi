import { defineStore } from 'pinia';
import { ref } from 'vue';
import { animeService } from '@/services/animeService';
import type { Anime, PaginationInfo, AnimeSearchParams } from '@/types/anime';
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

    return {
        // State
        animeList,
        pagination,
        isLoading,
        error,
        currentSearchQuery,

        // Actions
        fetchAnimeList,
        loadMoreAnime
    };
});
