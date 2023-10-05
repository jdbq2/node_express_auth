export type ValidRequestProperty = "body" | "query" | "params";

export interface PlatformUser {
    id?: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: string;
}
