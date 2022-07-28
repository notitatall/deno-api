import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../services/http_service_impl.ts";
import { HttpService } from "../../services/http_service.ts";
import { GidService } from "../../services/gid_service.ts";
import { GidServiceImpl } from "../../services/gid_service_impl.ts";
import {
  PostUserRequestBody,
  GetUserRequestBody,
} from "../../models/api_model.ts";
import { UserRepo } from "../../repositories/user_repo.ts";
import { UserRepoImpl } from "../../repositories/user_repo_impl.ts";

const gidService: GidService = new GidServiceImpl();
const userRepo: UserRepo = new UserRepoImpl();

export const handler: Handlers<string> = {
  async GET(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();

    const requestBody = (await request.json()) as GetUserRequestBody;
    const user = userRepo.get(requestBody.userGid);

    if (user === undefined) {
      return http.createJsonResponse(404, { message: "User not found" });
    }

    return http.createJsonResponse(200, user);
  },
  async POST(request: Request): Promise<Response> {
    const http: HttpService = new HttpServiceImpl();

    const requestBody = (await request.json()) as PostUserRequestBody;

    const gid = gidService.getNextGid();

    userRepo.put({
      gid,
      name: requestBody.name,
    });

    const user = userRepo.get(gid);
    return http.createJsonResponse(200, user);
  },
};
