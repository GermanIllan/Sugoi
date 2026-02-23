import apiClient from '@/services/axiosClient';
import type { AnimeSearchResponse, AnimeSearchParams } from '@/types/anime';

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
}

export const animeService = new AnimeService();
