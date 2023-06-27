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
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
  });

  test("GET id product", async () => {
    const response = await request(app).get(
      "/products/646b50906a04146e100478c3"
    );
    expect(response.statusCode).toBe(200);
  });

  test("GET id product not found", async () => {
    const response = await request(app).get("/products/646b50906a04146");
    expect(response.statusCode).toBe(404);
  });
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
  test("GET category", async () => {
    const response = await request(app).get("/products/category/Coleccionismo");
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
