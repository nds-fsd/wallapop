const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
});

describe("DELEAT /product", () => {
  // debe responder con un 200
  test("Borrar bien un producto, Response status 200", async () => {
    const response = await request(app).delete(
      "/products/646b7ead6a04146e10047a3a"
    );
    expect(response.statusCode).toBe(200);
  });

  test("borrar producto con falta de informacion, Response status 400", async () => {
    const response = await request(app).delete(
      "/products/647a0a0d6ce7d100bb29b7b9"
    );
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});