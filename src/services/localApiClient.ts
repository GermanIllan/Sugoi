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
 * Centralized Axios instance for local JSON Server.
 */
const localApiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

/**
 * Request interceptor
 */
localApiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 */
localApiClient.interceptors.response.use(
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
            apiError.message = (error.response.data as any)?.message || `Server Error: ${error.response.status}`;
        } else if (error.request) {
            apiError.message = 'No response received from local server.';
        } else {
            apiError.message = error.message;
        }

        return Promise.reject(apiError);
    }
);

export default localApiClient;
