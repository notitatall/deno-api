import { UserRepo } from "./user_repo.ts";
import { User } from "../models/data_model.ts";

export class UserRepoImpl implements UserRepo {
  // gid -> User
  private _users: Record<string, User> = {};

  get = (gid: string): User | undefined => this._users[gid];

  put = (user: User): string => {
    this._users[user.gid] = user;
    return user.gid;
  };
}
