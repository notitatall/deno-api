export interface HttpService {
  fetchJson<T>(request: Request): Promise<T>;
  createJsonResponse<T>(data: T): Response; 
}
