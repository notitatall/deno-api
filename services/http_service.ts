export interface HttpService {
  fetchJson<T>(request: Request): Promise<T>;
}
