export interface TrackingRecord {
    id?: number;
    userId: number;
    malId: number;
    category: 'anime' | 'manga';
    title: string;
    imageUrl: string;
    score: number | null;
    type: string;
    status: string;
    addedAt: string; // ISO string
}
