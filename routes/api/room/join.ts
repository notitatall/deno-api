import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../../services/http_service_impl.ts";
import { HttpService } from "../../../services/http_service.ts";
import { JoinRequestBody } from "../../../models/api_model.ts";
import { RoomRepo } from "../../../repositories/room_repo.ts";
import { RoomRepoImpl } from "../../../repositories/room_repo_impl.ts";

const roomRepo: RoomRepo = new RoomRepoImpl();

export const handler: Handlers<string> = {
  async PUT(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();

    const body = (await request.json()) as JoinRequestBody;

    roomRepo.addMember(body.roomGid, body.userGid);

    const room = roomRepo.get(body.roomGid);
    return http.createJsonResponse(room);
  },
};
