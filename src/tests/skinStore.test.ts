import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSkinStore } from '@/stores/skinStore';
import { useAuthStore } from '@/stores/authStore';
import { avatarService } from '@/services/avatarService';

// Mock services
vi.mock('@/services/avatarService', () => ({
    avatarService: {
        getByUserId: vi.fn(),
        save: vi.fn()
    }
}));

vi.mock('@/services/pollinationsService', () => ({
    pollinationsService: {
        generateImageUrl: vi.fn(() => 'https://mock-image.com')
    }
}));

describe('SkinStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    });

    it('should load gallery items from server when user is logged in', async () => {
        const authStore = useAuthStore();
        authStore.user = { id: 'user1', username: 'testuser', email: 'test@test.com' };

        const mockData = {
            id: 'record1',
            userId: 'user1',
            timestamps: [12345],
            lastGeneratedUrl: 'url1',
            galleryUrls: [{ url: 'url1', prompt: 'prompt1' }],
            activeHomeAvatarUrl: 'url1'
        };

        vi.mocked(avatarService.getByUserId).mockResolvedValue(mockData);

        const skinStore = useSkinStore();
        await skinStore.loadFromServer();

        expect(skinStore.galleryItems).toHaveLength(1);
        expect(skinStore.galleryItems[0]?.url).toBe('url1');
        expect(skinStore.isLoadingGallery).toBe(false);
    });

    it('should clear state when no user is present', async () => {
        const skinStore = useSkinStore();
        skinStore.galleryItems = [{ url: 'old', prompt: 'old' }];

        const authStore = useAuthStore();
        authStore.user = null;

        await skinStore.loadFromServer();

        expect(skinStore.galleryItems).toHaveLength(0);
    });

    it('should independently track loadingGallery and isGenerating', async () => {
        const skinStore = useSkinStore();
        const authStore = useAuthStore();
        authStore.user = { id: 'user1', username: 'test', email: '' };

        // Simulate slow gallery load
        let resolveLoad: any;
        const loadPromise = new Promise(resolve => resolveLoad = resolve);
        vi.mocked(avatarService.getByUserId).mockReturnValue(loadPromise as any);

        const callLoad = skinStore.loadFromServer();
        expect(skinStore.isLoadingGallery).toBe(true);
        expect(skinStore.isGenerating).toBe(false);

        resolveLoad({ galleryUrls: [] });
        await callLoad;
        expect(skinStore.isLoadingGallery).toBe(false);
    });
});
