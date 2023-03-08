declare namespace Express {
    export interface Request {
        user_id: string;
        user: {
            admin: boolean;
        }
    }
}