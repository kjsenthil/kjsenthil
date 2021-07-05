import { HttpMethod } from './types';
import { signRequest } from './http';

describe('Request signing tests', () => {
  test("Signs request correctly", () => {
    const actual = signRequest("testHost", HttpMethod.GET, "https://test.com", "credential", "secret")
    expect(actual['x-ms-content-sha256']).toEqual("47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=")
    expect(actual.Authorization).toContain("HMAC-SHA256 Credential=credential&SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=")
  });
});
