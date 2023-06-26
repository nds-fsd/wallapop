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

describe("DELETE FAV /favorites", () => {
  test("Response status 200", async () => {
    const response = await request(app)
      .delete("/favorites/647a09aec2c9e27299401deb/646b50906a04146e100478c3")
      .send({
        product: "646b50906a04146e100478c3",
      });

    expect(response.statusCode).toBe(200);
  });
  test("Response status 404, not found", async () => {
    const response = await request(app).delete("/favorites/").send({
      product: "646b50906a04146e100478c3",
    });

    expect(response.statusCode).toBe(404);
  });
  test("Response status 404, not fount, sin id de user", async () => {
    const response = await request(app)
      .delete("/favorites//646b50906a04146e100478c3")
      .send({
        product: "646b50906a04146e100478c3",
      });

    expect(response.statusCode).toBe(404);
  });
  test("Response status 404, not fount, sin id de user", async () => {
    const response = await request(app).delete("/favorites").send({
      product: "646b50906a04146e100478c3",
    });
    expect(response.statusCode).toBe(404);
  });
  test("Response status 500, error server", async () => {
    const response = await request(app).delete("/favorites/sdfas/asfasd").send({
      product: "giugjhgi",
    });
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
