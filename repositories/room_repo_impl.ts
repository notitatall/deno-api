import { RoomRepo } from "./room_repo.ts";
import { Room, Message } from "../models/data_model.ts";
import { room } from "../testing/fixtures/data_model_fixtures.ts";

export class RoomRepoImpl implements RoomRepo {
  // gid -> Room
  private _rooms: Record<string, Room> = {
    "123": room({ gid: "123" }),
    "098": room({ gid: "098" }),
    "789": room({ gid: "789" }),
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

    // use a Set to enforce uniqueness.
    const membersSet = new Set(room.members);

    return this.put({ ...room, members: Array.from(membersSet.add(userGid)) });
  };

  removeMember = (roomGid: string, userGid: string): string => {
    const room = this._getOrThrow(roomGid);

    // use a Set to enforce uniqueness.
    const membersSet = new Set(room.members);

    membersSet.delete(userGid);

    return this.put({ ...room, members: Array.from(membersSet) });
  };

  private _getOrThrow = (gid: string): Room => {
    const room = this.get(gid);

    if (room === undefined) {
      throw Error("room not found");
    }

    return room;
  };
}
