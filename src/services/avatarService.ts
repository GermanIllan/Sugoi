import localApiClient from './localApiClient';
import type { GalleryItem } from '@/types/skin';

export interface AvatarRecord {
    id?: string | number;
    userId: string | number;
    timestamps: number[];
    lastGeneratedUrl: string | null;
    galleryUrls: GalleryItem[];
    activeHomeAvatarUrl: string | null;
}

export const avatarService = {
    /**
     * Gets the avatar record for a specific user
     */
    async getByUserId(userId: string | number): Promise<AvatarRecord | null> {
        try {
            const response = await localApiClient.get<AvatarRecord[]>(`/avatars?userId=${userId}`);
            return response.data[0] ?? null;
        } catch (error) {
            console.error('Error fetching avatars by userId:', error);
            throw error;
        }
    },

    /**
     * Saves or updates an avatar record
     */
    async save(record: AvatarRecord): Promise<AvatarRecord> {
        try {
            if (record.id) {
                // Update existing
                const response = await localApiClient.put<AvatarRecord>(`/avatars/${record.id}`, record);
                return response.data;
            } else {
                // Create new
                const response = await localApiClient.post<AvatarRecord>('/avatars', record);
                return response.data;
            }
        } catch (error) {
            console.error('Error saving avatar record:', error);
            throw error;
        }
    },

    /**
     * Deletes an entire avatar record
     */
    async deleteRecord(recordId: string): Promise<void> {
        try {
            await localApiClient.delete(`/avatars/${recordId}`);
        } catch (error) {
            console.error('Error deleting avatar record:', error);
            throw error;
        }
    }
};
