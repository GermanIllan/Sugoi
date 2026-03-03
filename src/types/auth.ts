export interface User {
    id: string | number;
    username: string;
    email: string;
    avatarUrl?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}
