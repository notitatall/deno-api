import { Room, Message } from "../models/data_model.ts"

export interface RoomRepo {
    get(gid: string): Room | undefined;
    put(room: Room): string;
    getMessages(gid: string): Message[];
    putMessage(roomGid: string, message: Message): void;
    addMember(roomGid: string, userGid: string): string;
    removeMember(roomGid: string, userGid: string): string;
}