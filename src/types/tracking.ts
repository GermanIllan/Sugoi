export type WatchStatus = 'watched' | 'watching' | 'plan_to_watch';

export interface TrackingRecord {
    id?: number;
    userId: number;
    malId: number;
    category: 'anime' | 'manga';
    title: string;
    imageUrl: string;
    score: number | null;
    personalScore: number | null;
    type: string;
    status: string;
    watchStatus: WatchStatus;
    notes: string;
    addedAt: string; // ISO string
}
