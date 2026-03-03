/**
 * TypeScript definitions for Jikan API v4 Manga resources.
 */
import type { AnimeImages, AnimeTitle, PaginationInfo } from './anime';

export interface Manga {
    mal_id: number;
    url: string;
    images: AnimeImages; // Reusing image structure as it's identical
    approved: boolean;
    titles: AnimeTitle[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string;
    chapters: number | null;
    volumes: number | null;
    status: string;
    publishing: boolean;
    published: {
        from: string | null;
        to: string | null;
        prop: {
            from: { day: number | null; month: number | null; year: number | null };
            to: { day: number | null; month: number | null; year: number | null };
        };
        string: string;
    };
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string | null;
    background: string | null;
    authors: Array<{ mal_id: number; type: string; name: string; url: string }>;
    serializations: Array<{ mal_id: number; type: string; name: string; url: string }>;
    genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
    themes: Array<{ mal_id: number; type: string; name: string; url: string }>;
    demographics: Array<{ mal_id: number; type: string; name: string; url: string }>;
}

export interface MangaSearchResponse {
    data: Manga[];
    pagination: PaginationInfo;
}

export interface MangaSingleResponse {
    data: Manga;
}

export interface MangaSearchParams {
    q?: string;
    page?: number;
    limit?: number;
    type?: string;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: string;
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    order_by?: string;
    sort?: 'desc' | 'asc';
    letter?: string;
    magazines?: string;
    start_date?: string;
    end_date?: string;
}
