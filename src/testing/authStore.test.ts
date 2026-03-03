import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

// Mock authService
vi.mock('@/services/authService', () => ({
    authService: {
        login: vi.fn(),
        register: vi.fn()
    }
}));

describe('AuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should register a new user and update store state', async () => {
        const authStore = useAuthStore();
        const mockUser = {
            id: 12345,
            username: 'NewUser',
            email: 'new@user.com'
        };

        vi.mocked(authService.register).mockResolvedValue(mockUser);

        await authStore.register({
            username: 'NewUser',
            email: 'new@user.com',
            password: 'password123'
        });

        expect(authStore.user).toEqual(mockUser);
        expect(authStore.isAuthenticated).toBe(true);
        expect(localStorage.getItem('sugoi_auth_session')).toContain('NewUser');
    });

    it('should verify a registered user by logging in', async () => {
        const authStore = useAuthStore();
        const mockUser = {
            id: 1,
            username: 'Sugoi',
            email: 'admin@sugoi.com'
        };

        vi.mocked(authService.login).mockResolvedValue(mockUser);

        await authStore.login({
            email: 'admin@sugoi.com',
            password: 'admin123'
        });

        expect(authStore.user).toEqual(mockUser);
        expect(authStore.isAuthenticated).toBe(true);
        expect(authStore.error).toBeNull();
    });
});
