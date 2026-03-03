import localApiClient from './localApiClient';
import type { TrackingRecord } from '@/types/tracking';

/**
 * Service to manage tracking data in the local JSON server.
 */
export const trackingService = {
    /**
     * Get all tracking records for a specific user.
     */
    async getByUserId(userId: number): Promise<TrackingRecord[]> {
        const response = await localApiClient.get<TrackingRecord[]>(`/tracking?userId=${userId}`);
        return response.data;
    },

    /**
     * Add a new tracking record.
     */
    async add(record: TrackingRecord): Promise<TrackingRecord> {
        const response = await localApiClient.post<TrackingRecord>('/tracking', record);
        return response.data;
    },

    /**
     * Remove a tracking record by its internal ID.
     */
    async remove(recordId: number): Promise<void> {
        await localApiClient.delete(`/tracking/${recordId}`);
    },

    /**
     * Update a tracking record partialy.
     */
    async update(id: number, data: Partial<TrackingRecord>): Promise<TrackingRecord> {
        const response = await localApiClient.patch<TrackingRecord>(`/tracking/${id}`, data);
        return response.data;
    },

    /**
     * Check if an item is already tracked by a user.
     */
    async findRecord(userId: number, malId: number, category: 'anime' | 'manga'): Promise<TrackingRecord | null> {
        const response = await localApiClient.get<TrackingRecord[]>(
            `/tracking?userId=${userId}&malId=${malId}&category=${category}`
        );
        return response.data[0] ?? null;
    }
};
