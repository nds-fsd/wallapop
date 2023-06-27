const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
});

describe("Get ID /product", () => {
  // debe responder con un 200

  test("GET by user", async () => {
    const response = await request(app).get(
      "/products/getbyuser/6461693bf9a77cdb3d869ca5"
    );
    expect(response.statusCode).toBe(200);
  });
  test("GET by user", async () => {
    const response = await request(app).get("/products/getbyuser/");
    expect(response.statusCode).toBe(404);
  });
  test("GET by user not found", async () => {
    const response = await request(app).get(
      "/products/getbyuser/6461693bf9a77cdb3d8"
    );
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
