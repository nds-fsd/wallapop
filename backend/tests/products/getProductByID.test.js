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
  test("GET id product", async () => {
    const response = await request(app).get(
      "/products/646b50906a04146e100478c3"
    );
    expect(response.statusCode).toBe(200);
  });
  test("GET id product", async () => {
    const response = await request(app).get("/products/646b50906a04146");
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
