import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSkinStore } from '@/stores/skinStore';
import { useAuthStore } from '@/stores/authStore';
import { avatarService } from '@/services/avatarService';

// Mock avatarService
vi.mock('@/services/avatarService', () => ({
    avatarService: {
        getByUserId: vi.fn(),
        save: vi.fn()
    }
}));

describe('Avatar Validation', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    });

    it('should validate that created avatars exist for the user', async () => {
        // Set up auth state for the test
        const authStore = useAuthStore();
        authStore.user = { id: 1, username: 'Sugoi', email: 'admin@sugoi.com' };

        // Mock return data with existing gallery items
        const mockAvatarData = {
            id: 'avatar-id',
            userId: 1,
            timestamps: [Date.now()],
            lastGeneratedUrl: 'https://test-image.com/1.png',
            galleryUrls: [
                { url: 'https://test-image.com/1.png', prompt: 'Cool avatar' },
                { url: 'https://test-image.com/2.png', prompt: 'Another avatar' }
            ],
            activeHomeAvatarUrl: 'https://test-image.com/1.png'
        };

        vi.mocked(avatarService.getByUserId).mockResolvedValue(mockAvatarData);

        const skinStore = useSkinStore();

        // Load data from "server" (mocked service)
        await skinStore.loadFromServer();

        // Validate that gallery items were correctly loaded into the store
        expect(skinStore.galleryItems).toHaveLength(2);
        expect(skinStore.galleryItems[0].url).toBe('https://test-image.com/1.png');
        expect(skinStore.galleryItems[1].url).toBe('https://test-image.com/2.png');
    });
});
