/**
 * TypeScript definitions for Jikan API v4 Anime resources.
 * Following project rules: strict typing, English camelCase/PascalCase structures.
 */

export interface AnimeImage {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export interface AnimeImages {
    jpg: AnimeImage;
    webp: AnimeImage;
}

export interface AnimeTitle {
    type: string;
    title: string;
}

export interface Anime {
    mal_id: number;
    url: string;
    images: AnimeImages;
    approved: boolean;
    titles: AnimeTitle[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number | null;
    status: string;
    airing: boolean;
    duration: string;
    rating: string;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string | null;
    background: string | null;
    season: string | null;
    year: number | null;
    genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
}

export interface PaginationItems {
    count: number;
    total: number;
    per_page: number;
}

export interface PaginationInfo {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: PaginationItems;
}

export interface AnimeSearchResponse {
    data: Anime[];
    pagination: PaginationInfo;
}

export interface AnimeSearchParams {
    q?: string;
    page?: number;
    limit?: number;
    type?: string;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: string;
    rating?: string;
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    order_by?: string;
    sort?: 'desc' | 'asc';
    letter?: string;
    producers?: string;
    start_date?: string;
    end_date?: string;
}
