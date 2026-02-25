/**
 * Service to handle Pollinations AI image generation.
 */
class PollinationsService {
    private readonly baseUrl = import.meta.env.VITE_API_SKIN_URL;
    private readonly apiKey = import.meta.env.VITE_CREATE_SKIN_KEY;

    /**
     * Generates the URL for the AI image based on the prompt.
     * @param prompt User descriptive prompt
     * @param seed Optional seed for reproducible results
     */
    generateImageUrl(prompt: string, seed: number = 0): string {
        // Requirements: Always include "ANIME" prefix
        const fullPrompt = `ANIME,for 8k,high quality,pixel art, ${prompt.trim()}`;
        const encodedPrompt = encodeURIComponent(fullPrompt);

        // Model configuration as per HU-SKIN-002
        return `${this.baseUrl}${encodedPrompt}?model=gptimage&width=1024&height=1024&seed=${seed}&enhance=true&key=${this.apiKey}`;
    }
}

export const pollinationsService = new PollinationsService();
