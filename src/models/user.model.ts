export interface IUser {
    id: string;
    email: string;
    passwordAuth: string;
    createdAt: Date;
    profileImage?: string;
}