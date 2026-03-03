import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTrackingStore } from '@/stores/trackingStore';
import { trackingService } from '@/services/trackingService';
import type { TrackingRecord } from '@/types/tracking';

// Mock trackingService
vi.mock('@/services/trackingService', () => ({
    trackingService: {
        getByUserId: vi.fn(),
        add: vi.fn(),
        remove: vi.fn(),
        update: vi.fn(),
        findRecord: vi.fn()
    }
}));

describe('TrackingStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    it('should add an anime to tracking and validate its existence', async () => {
        const trackingStore = useTrackingStore();

        const mockAnime: TrackingRecord = {
            id: 1,
            userId: 1772294351797,
            malId: 57,
            category: 'anime',
            title: 'Beck',
            imageUrl: 'https://cdn.myanimelist.net/images/anime/11/11636.webp',
            score: 8.29,
            personalScore: 9,
            type: 'TV',
            status: 'Finished Airing',
            watchStatus: 'watched',
            notes: 'Classic',
            addedAt: new Date().toISOString()
        };

        vi.mocked(trackingService.add).mockResolvedValue(mockAnime);

        // Add to tracking
        const addPromise = trackingStore.addToTracking(mockAnime);

        // Fast-forward the 2 second Programanding2 loader timeout used in the store
        vi.runAllTimers();

        await addPromise;

        // Validate it exists in store tracking list
        expect(trackingStore.userTracking).toContainEqual(mockAnime);

        // Validate isTracked getter
        expect(trackingStore.isTracked(57, 'anime')).toBe(true);
        expect(trackingStore.isTracked(999, 'anime')).toBe(false);
    });
});
