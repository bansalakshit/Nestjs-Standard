export type Uuid = string;

export interface Register {
    id: Uuid;
    username: string;
    email: string;
    password: string;
}
