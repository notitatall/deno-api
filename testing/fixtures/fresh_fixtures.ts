import { HandlerContext } from "$fresh/server.ts";
import { noop } from "../mocks/function_mocks.ts"
import { netAddr } from "./deno_fixtures.ts";

// Testing fixtures for data types provided by the Fresh framework

export const handlerContext = <Data = unknown, State = Record<string, unknown>>(
  overrides: Partial<HandlerContext<Data, State>> = {}
): HandlerContext<Data, State> => ({
    localAddr: netAddr(),
    remoteAddr: netAddr(),
    params: {},
    render: noop,
    state: {} as State,
    ...overrides,
});
