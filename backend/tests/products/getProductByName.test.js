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
  test("GET id product, response 200", async () => {
    const response = await request(app).get("/products/category/product/ducati");
    expect(response.statusCode).toBe(200);
  });
  test("GET id product, response 404", async () => {
    const response = await request(app).get("/category/product/11");
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
