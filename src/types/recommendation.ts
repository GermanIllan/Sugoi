/**
 * TypeScript definitions for Jikan API v4 Recommendations resources.
 */

export interface RecommendationEntry {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    title: string;
}

export interface Recommendation {
    mal_id: string;
    entry: RecommendationEntry[];
    content: string;
    user: {
        url: string;
        username: string;
    };
}

export interface RecommendationResponse {
    data: Recommendation[];
}
