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

  test("Crear producto sin title , Response status 400", async () => {
    const response = await request(app)
      .patch("/products/646b50906a04146e100478c3")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "yfgukygfuyk",
        keywords: ["dhf"],
        price: 4564,
        sold: false,
        status: "Como nuevo",
        title: "",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });
  test("Crear producto sin description , Response status 400", async () => {
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
        title: "hola",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });
  test("Crear producto sin price , Response status 400", async () => {
    const response = await request(app)
      .patch("/products/646b50906a04146e100478c3")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "",
        keywords: ["dhf"],
        sold: false,
        status: "Como nuevo",
        title: "",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });

  test("Crear producto sin id , Response status 404", async () => {
    const response = await request(app)
      .patch("/products/")
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
    expect(response.statusCode).toBe(404);
  });
  test("Crear producto con id mal , Response status 500", async () => {
    const response = await request(app)
      .patch("/products/")
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
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
