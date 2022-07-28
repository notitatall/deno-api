import { RoomRepo } from "../repositories/room_repo.ts";
import { AccessControlService } from "../services/access_control_service.ts";

export class AccessControlServiceImpl implements AccessControlService {
  isUserAMember(roomRepo: RoomRepo, roomGid: string, userGid: string): boolean {
    const room = roomRepo.get(roomGid);
    if (room === undefined) {
      return false;
    }
    return room.members.includes(userGid);
  }
}
