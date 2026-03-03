import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/authService';
import type { User, LoginPayload, RegisterPayload } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const STORAGE_KEY = 'sugoi_auth_session';

    // Getters
    const isAuthenticated = computed(() => !!user.value);

    // Initialize from LocalStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            user.value = JSON.parse(saved);
        } catch (e) {
            console.error('Error parsing auth session', e);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // Actions
    const saveSession = (userData: User) => {
        user.value = userData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    };

    const login = async (payload: LoginPayload) => {
        isLoading.value = true;
        error.value = null;
        try {
            const userData = await authService.login(payload);
            saveSession(userData);
        } catch (err: any) {
            error.value = err.message || 'Error al iniciar sesión';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const register = async (payload: RegisterPayload) => {
        isLoading.value = true;
        error.value = null;
        try {
            const userData = await authService.register(payload);
            saveSession(userData);
        } catch (err: any) {
            error.value = err.message || 'Error al registrarse';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
        error.value = null;
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout
    };
});
