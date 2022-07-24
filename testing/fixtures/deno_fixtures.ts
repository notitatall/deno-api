export const netAddr = (
  overrides: Partial<Deno.NetAddr> = {}
): Deno.NetAddr => ({
  transport: "tcp",
  hostname: "eg.example.com",
  port: 8080,
  ...overrides,
});
