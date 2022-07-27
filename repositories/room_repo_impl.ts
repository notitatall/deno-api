import { RoomRepo } from "./room_repo.ts";
import { Room, Message } from "../models/data_model.ts";

export class RoomRepoImpl implements RoomRepo {
  // gid -> Room
  private _rooms: Record<string, Room> = {
    "123": {
        gid: "123",
        messages: [],
        members: new Set<string>()
    }
  };

  get = (gid: string): Room | undefined => this._rooms[gid];

  put = (room: Room): string => {
    this._rooms[room.gid] = room;
    return room.gid;
  };

  putMessage = (roomGid: string, message: Message): void => {
    const room = this._getOrThrow(roomGid);

    this.put({ ...room, messages: [...room.messages, message] });
  };

  getMessages = (gid: string): Message[] => this._rooms[gid].messages;

  addMember = (roomGid: string, userGid: string): string => {
    const room = this._getOrThrow(roomGid);

    const members = room.members.add(userGid);

    return this.put({ ...room, members });
  };

  removeMember = (roomGid: string, userGid: string): string => {
    const room = this._getOrThrow(roomGid);

    room.members.delete(userGid);

    return this.put(room);
  };

  private _getOrThrow = (gid: string): Room => {
    const room = this.get(gid);

    if (room === undefined) {
      throw Error("room not found");
    }

    return room;
  };
}