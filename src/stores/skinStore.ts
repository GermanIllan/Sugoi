import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { pollinationsService } from '@/services/pollinationsService';

/**
 * Interface for internal state tracking
 */
interface GenerationState {
    timestamps: number[];
    lastGeneratedUrl: string | null;
}

export const useSkinStore = defineStore('skin', () => {
    // State
    const lastImageUrl = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const generationTimestamps = ref<number[]>([]);

    const STORAGE_KEY = 'sugoi_skin_generations';
    const LIMIT_COUNT = 2;
    const LIMIT_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    // Initialize from LocalStorage
    onMounted(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data: GenerationState = JSON.parse(saved);
                generationTimestamps.value = data.timestamps || [];
                lastImageUrl.value = data.lastGeneratedUrl || null;
            } catch (e) {
                console.error('Error parsing saved skin state', e);
            }
        }
    });

    /**
     * Saves the current generation state to localStorage
     */
    const saveToStorage = () => {
        const data: GenerationState = {
            timestamps: generationTimestamps.value,
            lastGeneratedUrl: lastImageUrl.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    /**
     * Checks if the user can generate a new image
     * @returns { can: boolean, remainingDays?: number }
     */
    const checkLimit = () => {
        const now = Date.now();
        // Filter timestamps within the last 5 days
        generationTimestamps.value = generationTimestamps.value.filter(t => now - t < LIMIT_DAYS_MS);

        if (generationTimestamps.value.length >= LIMIT_COUNT) {
            const oldestValid = Math.min(...generationTimestamps.value);
            const timeLeft = LIMIT_DAYS_MS - (now - oldestValid);
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
            return { can: false, daysLeft };
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
            error.value = `Limit reached. You can generate again in ${limitStatus.daysLeft} days.`;
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
            saveToStorage();
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'An error occurred during generation';
            console.error('SkinStore.generateSkin Error:', err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        lastImageUrl,
        isLoading,
        error,
        generationTimestamps,
        generateSkin,
        checkLimit
    };
});
