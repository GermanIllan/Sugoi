import axios, { type AxiosInstance, type AxiosError } from 'axios';

/**
 * Interface for consistent error responses throughout the application.
 */
export interface ApiError {
    message: string;
    status?: number;
    data?: any;
}

/**
 * Centralized Axios instance for Jikan API (v4).
 * Configured with baseURL and global interceptors.
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jikan.moe/v4',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

/**
 * Request interceptor - Add common configuration here (e.g., auth tokens if needed)
 */
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Global error handling for responses >= 400
 */
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        let message = 'Ha ocurrido un error inesperado';

        if (status === 429) {
            message = 'Límite de peticiones excedido (Jikan API). Por favor, intenta de nuevo en unos segundos.';
        } else if (status && status >= 500) {
            message = 'El servidor de MyAnimeList está experimentando problemas. Por favor, intenta más tarde.';
        } else if (error.request) {
            message = 'No se ha podido conectar con el servidor. Revisa tu conexión a internet.';
        } else {
            message = (error.response?.data as any)?.message || error.message;
        }

        const apiError: ApiError = {
            message,
            status,
            data: error.response?.data,
        };

        return Promise.reject(apiError);
    }
);

export default apiClient;
