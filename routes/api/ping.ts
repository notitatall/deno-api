import { Handlers } from "$fresh/server.ts";
import { HttpServiceImpl } from "../../services/http_service_impl.ts"
import { HttpService } from "../../services/http_service.ts"
import { Pong } from "../../models/ping_model.ts"


export const handler: Handlers<string> = {
  GET(): Response {
    const http: HttpService = new HttpServiceImpl()
    const data: Pong = { ping: "pong" };
    return http.createJsonResponse(data);
  },
};
