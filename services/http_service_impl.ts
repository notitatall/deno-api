import { HttpService } from "./http_service.ts";

export class HttpServiceImpl implements HttpService {
  fetchJson = async <T>(request: Request): Promise<T> => {
    const response = await fetch(request);
    return (await response.json()) as T;
  };

  createJsonResponse = <T>(data: T): Response =>
    new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
}
