const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
});

describe("PATCH /product", () => {
  // debe responder con un 200
  test("EDITAR product, Response status 201", async () => {
    const response = await request(app)
      .patch("/products/646b50906a04146e100478c3")
      .send({
        booked: true,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "CAMBIANDO DESCRIPCION",
        keywords: ["dhf"],
        price: 4564,
        sold: false,
        status: "Como nuevo",
        title: "producto test cambiado",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(201);
  });

  test("Crear producto con falta de informacion , Response status 400", async () => {
    const response = await request(app)
      .patch("/products/646b50906a04146e100478c3")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "",
        keywords: ["dhf"],
        price: 4564,
        sold: false,
        status: "Como nuevo",
        title: "",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});