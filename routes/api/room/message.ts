import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../../services/http_service_impl.ts";
import { HttpService } from "../../../services/http_service.ts";
import { MessageRequestBody } from "../../../models/api_model.ts";
import { RoomRepo } from "../../../repositories/room_repo.ts";
import { RoomRepoImpl } from "../../../repositories/room_repo_impl.ts";
import { UserRepo } from "../../../repositories/user_repo.ts";
import { UserRepoImpl } from "../../../repositories/user_repo_impl.ts";
import { AccessControlService } from "../../../services/access_control_service.ts";
import { AccessControlServiceImpl } from "../../../services/access_control_service_impl.ts";

const roomRepo: RoomRepo = new RoomRepoImpl();
const userRepo: UserRepo = new UserRepoImpl();

export const handler: Handlers<string> = {
  async POST(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();
    const accessControl: AccessControlService = new AccessControlServiceImpl();

    const requestBody = (await request.json()) as MessageRequestBody;

    const user = userRepo.get(requestBody.userGid);

    if (user === undefined) {
      return http.createJsonResponse(404, { message: "User not found" });
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

    const message = {
      body: requestBody.messageBody,
      user: user,
    };

    roomRepo.putMessage(requestBody.roomGid, message);

    const room = roomRepo.get(requestBody.roomGid);
    return http.createJsonResponse(200, room);
  },
};
