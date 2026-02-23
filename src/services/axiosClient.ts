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
        const apiError: ApiError = {
            message: 'An unexpected error occurred',
            status: error.response?.status,
            data: error.response?.data,
        };

        if (error.response) {
            // Server responded with a status code outside the 2xx range
            apiError.message = (error.response.data as any)?.message || `Server Error: ${error.response.status}`;
        } else if (error.request) {
            // Request was made but no response was received
            apiError.message = 'No response received from server. Please check your connection.';
        } else {
            // Something happened in setting up the request
            apiError.message = error.message;
        }

        return Promise.reject(apiError);
    }
);

export default apiClient;
