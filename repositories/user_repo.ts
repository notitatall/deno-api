import { User } from "../models/data_model.ts"

export interface UserRepo {
    get(gid: string): User;
    put(user: User): string;
}