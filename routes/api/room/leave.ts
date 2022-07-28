import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../../services/http_service_impl.ts";
import { HttpService } from "../../../services/http_service.ts";
import { MembershipChangeRequestBody } from "../../../models/api_model.ts";
import { RoomRepo } from "../../../repositories/room_repo.ts";
import { RoomRepoImpl } from "../../../repositories/room_repo_impl.ts";

const roomRepo: RoomRepo = new RoomRepoImpl();

export const handler: Handlers<string> = {
  async PUT(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();

    const requestBody = (await request.json()) as MembershipChangeRequestBody;

    roomRepo.removeMember(requestBody.roomGid, requestBody.userGid);

    const room = roomRepo.get(requestBody.roomGid);
    return http.createJsonResponse(200, room);
  },
};
