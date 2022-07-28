import { RoomRepo } from "../repositories/room_repo.ts";

export interface AccessControlService {
    isUserAMember(roomRepo: RoomRepo, roomGid: string, userGid: string): boolean;
}