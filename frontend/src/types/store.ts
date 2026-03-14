import type { User } from './user'

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean | null;

    signUp: (
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string
    ) => Promise<void>;

    signIn: (
        username: string,
        password: string
    ) => Promise<void>;
}