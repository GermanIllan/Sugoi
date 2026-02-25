import { defineStore } from 'pinia';
import { ref } from 'vue';
import { pollinationsService } from '@/services/pollinationsService';
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
    // State
    const lastImageUrl = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const generationTimestamps = ref<number[]>([]);
    const galleryItems = ref<GalleryItem[]>([]);
    const activeHomeAvatarUrl = ref<string | null>(null);

    const STORAGE_KEY = 'sugoi_skin_generations';
    const TIME_LIMIT_COUNT = 8; // Keep the original time limit logic for rate limiting
    const GLOBAL_LIMIT_COUNT = 8; // User wants max 8 images total
    const LIMIT_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    // Initialize from LocalStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data: GenerationState = JSON.parse(saved);
            generationTimestamps.value = data.timestamps || [];
            lastImageUrl.value = data.lastGeneratedUrl || null;

            // Migration check: verify if items are strings or objects
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
        }
    }

    /**
     * Saves the current generation state to localStorage
     */
    const saveToStorage = () => {
        const data: GenerationState = {
            timestamps: generationTimestamps.value,
            lastGeneratedUrl: lastImageUrl.value,
            galleryUrls: galleryItems.value, // Match interface and key
            activeHomeAvatarUrl: activeHomeAvatarUrl.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
        downloadImage
    };
});
