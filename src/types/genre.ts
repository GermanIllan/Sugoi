/**
 * TypeScript definitions for Jikan API v4 Genre resources.
 */

export interface Genre {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

export interface GenreResponse {
    data: Genre[];
}
