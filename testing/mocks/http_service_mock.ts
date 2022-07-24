import { HttpService } from "../../services/http_service.ts";
import sinon from "sinon";

export type MockHttpService = { [K in keyof HttpService]: sinon.SinonStub };

export const create = (): MockHttpService => ({
  fetchJson: sinon.stub(),
  createJsonResponse: sinon.stub(),
});
