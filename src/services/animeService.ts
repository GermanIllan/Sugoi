import apiClient from '@/services/axiosClient';
import type { AnimeSearchResponse, AnimeSearchParams, AnimeSingleResponse } from '@/types/anime';

/**
 * Service to handle API requests related to Animes.
 */
class AnimeService {
    /**
     * Fetch a paginated list of Animes based on search parameters.
     * @param params - Search parameters (q, page, limit, filters, etc.)
     * @returns Promise resolving to the AnimeSearchResponse structure.
     */
    async getAnimeList(params: AnimeSearchParams): Promise<AnimeSearchResponse> {
        try {
            const response = await apiClient.get<AnimeSearchResponse>('/anime', { params });
            return response.data;
        } catch (error) {
            console.error('AnimeService.getAnimeList Error:', error);
            throw error; // Re-throw to be handled by the caller (like Pinia store)
        }
    }

    /**
     * Fetch a single Anime by its ID.
     * @param id - The mal_id of the anime.
     * @returns Promise resolving to the AnimeSingleResponse structure.
     */
    async getAnimeById(id: number): Promise<AnimeSingleResponse> {
        try {
            const response = await apiClient.get<AnimeSingleResponse>(`/anime/${id}`);
            return response.data;
        } catch (error) {
            console.error(`AnimeService.getAnimeById (${id}) Error:`, error);
            throw error;
        }
    }
}

export const animeService = new AnimeService();
