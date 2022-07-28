import { User } from "../models/data_model.ts"

export interface UserRepo {
    get(gid: string): User | undefined;
    put(user: User): string;
}