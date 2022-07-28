export interface HttpService {
  fetchJson<T>(request: Request): Promise<T>;
  createJsonResponse<T>(status: number, data: T): Response;
}
