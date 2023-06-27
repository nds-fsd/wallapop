const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
});

describe("Get Name /product", () => {
  // debe responder con un 200
  test("GET sold product", async () => {
    const response = await request(app).get(
      "/products/sold/6461693bf9a77cdb3d869ca5"
    );
    expect(response.statusCode).toBe(200);
  });
  test("GET sold product not found 404", async () => {
    const response = await request(app).get("/products/sold/");
    expect(response.statusCode).toBe(404);
  });
  test("GET sold product not found 500", async () => {
    const response = await request(app).get("/products/sold/sdfsdhf");
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
