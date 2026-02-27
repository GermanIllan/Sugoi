import localApiClient from './localApiClient';
import type { User, LoginPayload, RegisterPayload } from '@/types/auth';

class AuthService {
    /**
     * Simulates login by fetching user by email and comparing password
     */
    async login(payload: LoginPayload): Promise<User> {
        try {
            const response = await localApiClient.get<any[]>(`/users?email=${payload.email}`);
            const user = response.data[0];

            if (!user || user.password !== payload.password) {
                throw new Error('Credenciales inválidas');
            }

            // Return user without password
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error: any) {
            console.error('AuthService.login Error:', error);
            throw error;
        }
    }

    /**
     * Checks if email exists and creates a new user
     */
    async register(payload: RegisterPayload): Promise<User> {
        try {
            // Check if user already exists
            const existing = await localApiClient.get<any[]>(`/users?email=${payload.email}`);
            if (existing.data.length > 0) {
                throw new Error('El correo electrónico ya está registrado');
            }

            // Create new user
            const response = await localApiClient.post<any>('/users', {
                ...payload,
                id: Date.now().toString()
            });

            const { password, ...userWithoutPassword } = response.data;
            return userWithoutPassword as User;
        } catch (error: any) {
            console.error('AuthService.register Error:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();
