import apiClient from '@/services/axiosClient';
import type { MangaSearchResponse, MangaSearchParams, MangaSingleResponse } from '@/types/manga';
import type { GenreResponse } from '@/types/genre';
import type { NewsResponse } from '@/types/news';
import type { RecommendationResponse } from '@/types/recommendation';

/**
 * Service to handle API requests related to Mangas.
 */
class MangaService {
    /**
     * Fetch a paginated list of Mangas based on search parameters.
     */
    async getMangaList(params: MangaSearchParams): Promise<MangaSearchResponse> {
        try {
            const response = await apiClient.get<MangaSearchResponse>('/manga', { params });
            return response.data;
        } catch (error) {
            console.error('MangaService.getMangaList Error:', error);
            throw error;
        }
    }

    /**
     * Fetch a single Manga by its ID.
     */
    async getMangaById(id: number): Promise<MangaSingleResponse> {
        try {
            const response = await apiClient.get<MangaSingleResponse>(`/manga/${id}`);
            return response.data;
        } catch (error) {
            console.error(`MangaService.getMangaById (${id}) Error:`, error);
            throw error;
        }
    }

    /**
     * Fetch the top-rated Mangas (Ranking).
     */
    async getMangaRanking(page: number = 1): Promise<MangaSearchResponse> {
        try {
            const response = await apiClient.get<MangaSearchResponse>('/top/manga', { params: { page } });
            return response.data;
        } catch (error) {
            console.error('MangaService.getMangaRanking Error:', error);
            throw error;
        }
    }

    /**
     * Fetch the list of manga genres.
     */
    async getMangaGenres(): Promise<GenreResponse> {
        try {
            const response = await apiClient.get<GenreResponse>('/genres/manga');
            return response.data;
        } catch (error) {
            console.error('MangaService.getMangaGenres Error:', error);
            throw error;
        }
    }

    /**
     * Fetch news for a specific manga.
     * @param id - mal_id of the manga.
     */
    async getMangaNews(id: number): Promise<NewsResponse> {
        try {
            const response = await apiClient.get<NewsResponse>(`/manga/${id}/news`);
            return response.data;
        } catch (error) {
            console.error(`MangaService.getMangaNews (${id}) Error:`, error);
            throw error;
        }
    }

    /**
     * Fetch global manga recommendations.
     */
    async getMangaRecommendations(): Promise<RecommendationResponse> {
        try {
            const response = await apiClient.get<RecommendationResponse>('/recommendations/manga');
            return response.data;
        } catch (error) {
            console.error('MangaService.getMangaRecommendations Error:', error);
            throw error;
        }
    }
}

export const mangaService = new MangaService();
