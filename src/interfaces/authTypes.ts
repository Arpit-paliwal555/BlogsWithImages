export type UserId = string | number;

export interface IUser {
    id: UserId;
    username: string;
    name: string;
    email: string;
    // Add other user-related fields as needed
}

export interface AuthState {
    user: IUser | null;
    accessToken?: string | null;
    }