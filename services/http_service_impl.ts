import { HttpService } from "./http_service.ts";

export class HttpServiceImpl implements HttpService {
  fetchJson = async <T>(request: Request): Promise<T> => {
    const response = await fetch(request);
    return (await response.json()) as T;
  };

  createJsonResponse = <T>(status: number, data: T): Response =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}
