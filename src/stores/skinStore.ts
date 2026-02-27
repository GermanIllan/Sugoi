import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { pollinationsService } from '@/services/pollinationsService';
import { useAuthStore } from '@/stores/authStore';
import type { GalleryItem } from '@/types/skin';

/**
 * Interface for internal state tracking
 */
interface GenerationState {
    timestamps: number[];
    lastGeneratedUrl: string | null;
    galleryUrls: GalleryItem[];
    activeHomeAvatarUrl: string | null;
}

export const useSkinStore = defineStore('skin', () => {
    const authStore = useAuthStore();
    const { user, isAuthenticated } = storeToRefs(authStore);

    // State
    const lastImageUrl = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const generationTimestamps = ref<number[]>([]);
    const galleryItems = ref<GalleryItem[]>([]);
    const activeHomeAvatarUrl = ref<string | null>(null);

    const BASE_STORAGE_KEY = 'sugoi_skin_generations';
    const TIME_LIMIT_COUNT = 8;
    const GLOBAL_LIMIT_COUNT = 8;
    const LIMIT_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    const currentStorageKey = computed(() => {
        return user.value ? `${BASE_STORAGE_KEY}_${user.value.id}` : BASE_STORAGE_KEY;
    });

    /**
     * Loads the state from localStorage based on current user
     */
    const loadFromStorage = () => {
        const saved = localStorage.getItem(currentStorageKey.value);
        if (saved) {
            try {
                const data: GenerationState = JSON.parse(saved);
                generationTimestamps.value = data.timestamps || [];
                lastImageUrl.value = data.lastGeneratedUrl || null;

                const rawGallery = data.galleryUrls || [];
                galleryItems.value = rawGallery.map((item: any) => {
                    if (typeof item === 'string') {
                        return { url: item, prompt: 'Generación previa' };
                    }
                    return item;
                });

                activeHomeAvatarUrl.value = data.activeHomeAvatarUrl || null;
            } catch (e) {
                console.error('Error parsing saved skin state', e);
                clearState();
            }
        } else {
            clearState();
        }
    };

    const clearState = () => {
        generationTimestamps.value = [];
        lastImageUrl.value = null;
        galleryItems.value = [];
        activeHomeAvatarUrl.value = null;
    };

    // Watch for user changes to load appropriate gallery
    watch(user, () => {
        loadFromStorage();
    }, { immediate: true });

    /**
     * Saves the current generation state to localStorage
     */
    const saveToStorage = () => {
        const data: GenerationState = {
            timestamps: generationTimestamps.value,
            lastGeneratedUrl: lastImageUrl.value,
            galleryUrls: galleryItems.value,
            activeHomeAvatarUrl: activeHomeAvatarUrl.value
        };
        localStorage.setItem(currentStorageKey.value, JSON.stringify(data));
    };

    /**
     * Checks if the user can generate a new image
     * @returns { can: boolean, remainingDays?: number }
     */
    const checkLimit = () => {
        const now = Date.now();

        // 1. HARD LIMIT CHECK (Total 8 images)
        if (galleryItems.value.length >= GLOBAL_LIMIT_COUNT) {
            return { can: false, reason: 'global_limit' };
        }

        // 2. TIME LIMIT CHECK (Rate limiting)
        // Filter timestamps within the last 5 days
        const recentTimestamps = generationTimestamps.value.filter(t => now - t < LIMIT_DAYS_MS);

        if (recentTimestamps.length >= TIME_LIMIT_COUNT) {
            const oldestValid = Math.min(...recentTimestamps);
            const timeLeft = LIMIT_DAYS_MS - (now - oldestValid);
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
            return { can: false, reason: 'time_limit', daysLeft };
        }

        return { can: true };
    };

    /**
     * Action to generate a new avatar skin
     * @param prompt User prompt (prefix "ANIME" is added in service)
     */
    const generateSkin = async (prompt: string) => {
        if (!isAuthenticated.value) {
            error.value = 'Debes iniciar sesión para generar un avatar.';
            return;
        }

        const limitStatus = checkLimit();
        if (!limitStatus.can) {
            if (limitStatus.reason === 'global_limit') {
                error.value = 'Has alcanzado el límite máximo de 8 imágenes en tu galería.';
            } else {
                error.value = `Límite temporal alcanzado. Podrás generar de nuevo en ${limitStatus.daysLeft} días.`;
            }
            return;
        }

        isLoading.value = true;
        error.value = null;

        try {
            // Create a random seed for variety
            const seed = Math.floor(Math.random() * 1000000);
            const url = pollinationsService.generateImageUrl(prompt, seed);

            // We "pre-load" the image to ensure it works before showing
            const img = new Image();
            img.src = url;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => reject(new Error('Failed to load generated image. Please try again.'));
            });

            lastImageUrl.value = url;
            generationTimestamps.value.push(Date.now());
            galleryItems.value.unshift({ url, prompt }); // Add to gallery with prompt
            saveToStorage();
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'An error occurred during generation';
            console.error('SkinStore.generateSkin Error:', err);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Delete an image from the gallery
     */
    const deleteImage = (url: string) => {
        galleryItems.value = galleryItems.value.filter(item => item.url !== url);
        if (activeHomeAvatarUrl.value === url) {
            activeHomeAvatarUrl.value = null;
        }
        if (lastImageUrl.value === url) {
            lastImageUrl.value = null;
        }
        saveToStorage();
    };

    /**
     * Set the current active avatar for the Home page
     */
    const setActiveHomeAvatar = (url: string) => {
        activeHomeAvatarUrl.value = url;
        saveToStorage();
    };

    /**
     * Triggers a browser download for the given image URL
     */
    const downloadImage = async (url: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `sugoi-avatar-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download failed', err);
            error.value = 'Failed to download image. Please try again.';
        }
    };

    return {
        lastImageUrl,
        isLoading,
        error,
        generationTimestamps,
        galleryItems,
        activeHomeAvatarUrl,
        generateSkin,
        checkLimit,
        setActiveHomeAvatar,
        downloadImage,
        deleteImage
    };
});
