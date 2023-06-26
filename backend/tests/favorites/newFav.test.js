const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");
const { loadProducts } = require("../fixtures/products.data");
const { loadFav } = require("../fixtures/favorites.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
  await loadProducts();
  await loadFav();
});

describe("New FAV /favorites exiting", () => {
  test("Response status 200", async () => {
    const response = await request(app)
      .post("/favorites/647a09aec2c9e27299401deb")
      .send({
        product: "646b7ead6a04146e10047a3a",
      });

    expect(response.statusCode).toBe(200);
  });
  test("Response status 201, create", async () => {
    const response = await request(app)
      .post("/favorites/64616c4234a0347d87b9e8f9")
      .send({
        product: "649407268a5285c5ebfea2cc",
      });

    expect(response.statusCode).toBe(201);
  });
  test("Response status 404", async () => {
    const response = await request(app).post(
      "/favorites/647a09aec2c9e27299401deb"
    );

    expect(response.statusCode).toBe(404);
  });
  test("Response status 404", async () => {
    const response = await request(app).post("/favorites/").send({
      product: "646b7ead6a04146e10047a3a",
    });

    expect(response.statusCode).toBe(404);
  });
  test("Response status 500", async () => {
    const response = await request(app).post("/favorites/joijoj").send({
      product: "oijoijoij",
    });

    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
