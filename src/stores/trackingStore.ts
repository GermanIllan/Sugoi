import { defineStore } from 'pinia';
import { ref } from 'vue';
import { trackingService } from '@/services/trackingService';
import type { TrackingRecord } from '@/types/tracking';

export const useTrackingStore = defineStore('tracking', () => {
    const userTracking = ref<TrackingRecord[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

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

    /**
     * Adds an item to tracking.
     */
    const addToTracking = async (record: TrackingRecord) => {
        isLoading.value = true;
        try {
            const newRecord = await trackingService.add(record);
            userTracking.value.push(newRecord);
        } catch (err: any) {
            error.value = err.message || 'Error al añadir seguimiento';
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
        error,
        loadUserTracking,
        addToTracking,
        removeFromTracking,
        isTracked
    };
});
