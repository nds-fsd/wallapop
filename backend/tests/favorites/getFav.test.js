const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");
const { loadProducts } = require("../fixtures/products.data");
const { loadfav } = require("../fixtures/favorites.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("Get FAV /fav", () => {
  test("Response status 200", async () => {
    const response = await request(app).get(
      "/favorites/648203b0821fd45051675928"
    );
    expect(response.statusCode).toBe(200);
  });

  test("Response status 500", async () => {
    const response = await request(app).get("/favorites/647a09aec2c9e2729");
    expect(response.statusCode).toBe(500);
  });
  test("Response status 404 not found", async () => {
    const response = await request(app).get("/favorites/");
    expect(response.statusCode).toBe(404);
  });
  test("Response status 200, favorito ya existe", async () => {
    const response = await request(app).get(
      "/favorites/6488844a85809e9a41b9d192"
    );
    expect(response.statusCode).toBe(200);
  });
  test("Response status 500, favorito ya existe", async () => {
    const response = await request(app).get(
      "/favorites/fuygfluugliuilh"
    );
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
