/**
 * TypeScript definitions for Jikan API v4 News resources.
 */

export interface NewsImage {
    jpg: {
        image_url: string | null;
    };
}

export interface News {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_name: string;
    author_url: string;
    forum_url: string;
    images: NewsImage;
    comments: number;
    excerpt: string;
}

export interface NewsResponse {
    data: News[];
}

export type SavedNewsStatus = 'pending' | 'seen';

export interface SavedNewsItem {
    userId: number;
    newsKey: string;
    source: 'anime' | 'manga';
    parentId: number;
    mal_id: number;
    title: string;
    date: string;
    author_name: string;
    excerpt: string;
    coverImageUrl: string;
    url: string;
    status: SavedNewsStatus;
    savedAt: string;
}
