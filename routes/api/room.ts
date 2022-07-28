import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../services/http_service_impl.ts";
import { HttpService } from "../../services/http_service.ts";
import { GidService } from "../../services/gid_service.ts";
import { GidServiceImpl } from "../../services/gid_service_impl.ts";
import {
  PostRoomRequestBody,
  GetRoomRequestBody,
} from "../../models/api_model.ts";
import { RoomRepo } from "../../repositories/room_repo.ts";
import { RoomRepoImpl } from "../../repositories/room_repo_impl.ts";
import { AccessControlService } from "../../services/access_control_service.ts";
import { AccessControlServiceImpl } from "../../services/access_control_service_impl.ts";

const gidService: GidService = new GidServiceImpl();
const roomRepo: RoomRepo = new RoomRepoImpl();

export const handler: Handlers<string> = {
  async GET(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();
    const accessControl: AccessControlService = new AccessControlServiceImpl();

    const requestBody = (await request.json()) as GetRoomRequestBody;
    const room = roomRepo.get(requestBody.roomGid);

    if (room === undefined) {
      return http.createJsonResponse(404, { message: "Room not found" });
    } else if (
      !accessControl.isUserAMember(
        roomRepo,
        requestBody.roomGid,
        requestBody.userGid
      )
    ) {
      return http.createJsonResponse(403, {
        message: "User is not a member of the room",
      });
    }

    return http.createJsonResponse(200, room);
  },
  async POST(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();

    const requestBody = (await request.json()) as PostRoomRequestBody;

    const gid = gidService.getNextGid();

    roomRepo.put({
      gid,
      name: requestBody.name,
      members: [requestBody.userGid],
      messages: [],
    });

    const room = roomRepo.get(gid);
    return http.createJsonResponse(200, room);
  },
};
