import apiClient from '@/services/axiosClient';
import type { AnimeSearchResponse, AnimeSearchParams, AnimeSingleResponse } from '@/types/anime';
import type { GenreResponse } from '@/types/genre';
import type { NewsResponse } from '@/types/news';
import type { RecommendationResponse } from '@/types/recommendation';

export interface PromoItem {
    mal_id: number;
    url: string;
    title: string;
    episode: string | null;
    entry: {
        mal_id: number;
        url: string;
        title: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
    };
    trailer: {
        url: string | null;
        embed_url: string | null;
        images: {
            image_url: string | null;
            large_image_url: string | null;
            maximum_image_url: string | null;
        };
    };
}

export interface PromoResponse {
    data: PromoItem[];
}

export interface AnimeReviewItem {
    mal_id: number;
    url: string;
    date: string;
    review: string;
    score: number;
    is_spoiler: boolean;
    reactions: {
        overall: number;
    };
    user: {
        username: string;
        url: string;
    };
    entry: {
        mal_id: number;
        url: string;
        title: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
    };
}

export interface AnimeReviewResponse {
    data: AnimeReviewItem[];
}

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
            throw error;
        }
    }

    /**
     * Fetch the top-rated Animes (Ranking).
     * @param page - Page number to fetch.
     * @returns Promise resolving to the AnimeSearchResponse structure.
     */
    async getAnimeRanking(page: number = 1): Promise<AnimeSearchResponse> {
        try {
            const response = await apiClient.get<AnimeSearchResponse>('/top/anime', { params: { page } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch the list of anime genres.
     * @returns Promise resolving to the GenreResponse structure.
     */
    async getAnimeGenres(): Promise<GenreResponse> {
        try {
            const response = await apiClient.get<GenreResponse>('/genres/anime');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch news for a specific anime.
     * @param id - mal_id of the anime.
     */
    async getAnimeNews(id: number): Promise<NewsResponse> {
        try {
            const response = await apiClient.get<NewsResponse>(`/anime/${id}/news`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch global anime recommendations.
     */
    async getAnimeRecommendations(): Promise<RecommendationResponse> {
        try {
            const response = await apiClient.get<RecommendationResponse>('/recommendations/anime');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch upcoming anime seasons.
     * @param page - Page number to fetch.
     */
    async getUpcomingSeason(page: number = 1): Promise<AnimeSearchResponse> {
        try {
            const response = await apiClient.get<AnimeSearchResponse>('/seasons/upcoming', { params: { page } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch current anime schedule list.
     */
    async getSchedules(page: number = 1): Promise<AnimeSearchResponse> {
        try {
            const response = await apiClient.get<AnimeSearchResponse>('/schedules', { params: { page } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch latest anime promos.
     */
    async getWatchPromos(): Promise<PromoResponse> {
        try {
            const response = await apiClient.get<PromoResponse>('/watch/promos');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch popular anime promos.
     */
    async getPopularWatchPromos(): Promise<PromoResponse> {
        try {
            const response = await apiClient.get<PromoResponse>('/watch/promos/popular');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetch latest anime reviews.
     */
    async getAnimeReviews(page: number = 1): Promise<AnimeReviewResponse> {
        try {
            const response = await apiClient.get<AnimeReviewResponse>('/reviews/anime', { params: { page } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const animeService = new AnimeService();
