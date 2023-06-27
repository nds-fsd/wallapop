const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");
const { loadFav } = require("../fixtures/favorites.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
  await loadFav();
});

describe("Get Fav /product", () => {
  // debe responder con un 200

  test("GET by  fav, response 200", async () => {
    const response = await request(app).get(
      "/products/getbyuser/648203b0821fd45051675928"
    );
    expect(response.statusCode).toBe(200);
  });
  test("GET by  fav, response 404", async () => {
    const response = await request(app).get("/products/getbyuser/");
    expect(response.statusCode).toBe(404);
  });

  test("GET by fav, response 500", async () => {
    const response = await request(app).get("/products/getbyuser/fjdisdhfsoi");
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
