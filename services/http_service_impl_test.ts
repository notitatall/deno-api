import { describe, it } from "bdd";
import { assertStrictEquals } from "asserts";
import { HttpServiceImpl } from "./http_service_impl.ts";

describe("HttpServiceImpl", () => {
  const http = new HttpServiceImpl();

  describe("createJsonResponse", () => {
    it("adds the json Content-Type header", () => {
      const expected = "application/json";

      const result = http.createJsonResponse({});

      assertStrictEquals(result.headers.get("Content-Type"), expected);
    });
  });
});
