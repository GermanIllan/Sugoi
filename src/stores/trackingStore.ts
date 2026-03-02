import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { trackingService } from '@/services/trackingService';
import type { TrackingRecord } from '@/types/tracking';

export const useTrackingStore = defineStore('tracking', () => {
    const userTracking = ref<TrackingRecord[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const stats = computed(() => {
        const totalAnime = userTracking.value.filter(i => i.category === 'anime').length;
        const totalManga = userTracking.value.filter(i => i.category === 'manga').length;
        const watched = userTracking.value.filter(i => i.watchStatus === 'watched').length;
        const planToWatch = userTracking.value.filter(i => i.watchStatus === 'plan_to_watch').length;

        const topRatedItems = [...userTracking.value]
            .filter(i => i.personalScore !== null)
            .sort((a, b) => (b.personalScore || 0) - (a.personalScore || 0))
            .slice(0, 3);

        return { totalAnime, totalManga, watched, planToWatch, topRatedItems };
    });

    /**
     * Load all tracking items for the current user.
     */
    const loadUserTracking = async (userId: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            userTracking.value = await trackingService.getByUserId(userId);
        } catch (err: any) {
            error.value = err.message || 'Error al cargar el seguimiento';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    const isPikachuLoading = ref(false);

    /**
     * Adds an item to tracking.
     */
    const addToTracking = async (record: TrackingRecord) => {
        isLoading.value = true;
        isPikachuLoading.value = true; // Show pikachu splash
        const startTime = Date.now();

        try {
            const newRecord = await trackingService.add(record);
            userTracking.value.push(newRecord);
        } catch (err: any) {
            error.value = err.message || 'Error al añadir seguimiento';
            isPikachuLoading.value = false;
            throw err;
        } finally {
            isLoading.value = false;

            // Ensure pikachu is shown for at least 2 seconds
            const now = Date.now();
            const elapsed = now - startTime;
            const remaining = Math.max(0, 2000 - elapsed);

            setTimeout(() => {
                isPikachuLoading.value = false;
            }, remaining);
        }
    };

    /**
     * Update an existing tracking record.
     */
    const updateTracking = async (id: number, data: Partial<TrackingRecord>) => {
        isLoading.value = true;
        try {
            const updated = await trackingService.update(id, data);
            const index = userTracking.value.findIndex(i => i.id === id);
            if (index !== -1) {
                userTracking.value[index] = updated;
            }
        } catch (err: any) {
            error.value = err.message || 'Error al actualizar seguimiento';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Removes an item from tracking.
     */
    const removeFromTracking = async (userId: number, malId: number, category: 'anime' | 'manga') => {
        isLoading.value = true;
        try {
            const record = await trackingService.findRecord(userId, malId, category);
            if (record && record.id !== undefined) {
                await trackingService.remove(record.id);
                userTracking.value = userTracking.value.filter(item => item.id !== record.id);
            }
        } catch (err: any) {
            error.value = err.message || 'Error al eliminar seguimiento';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Checks if an item is already tracked.
     */
    const isTracked = (malId: number, category: 'anime' | 'manga') => {
        return userTracking.value.some(item => item.malId === malId && item.category === category);
    };

    return {
        userTracking,
        isLoading,
        isPikachuLoading,
        error,
        stats,
        loadUserTracking,
        addToTracking,
        updateTracking,
        removeFromTracking,
        isTracked
    };
});
