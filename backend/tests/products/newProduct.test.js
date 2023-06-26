const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
});

describe("POST /product", () => {
  // debe responder con un 200
  test("crear bien un producto, Response status 200", async () => {
    const response = await request(app)
      .post("/products/newProduct/647a09aec2c9e27299401deb")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "kdjsojdfis",
        keywords: ["dhf"],
        price: 4564,
        sold: false,
        status: "Como nuevo",
        title: "producto test",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(201);
  });

  test("Crear producto sin titulo, Response status 400", async () => {
    const response = await request(app)
      .post("/products/newProduct/647a09aec2c9e27299401deb")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "hhhiokjl",
        keywords: ["dhf"],
        price: 4564,
        sold: false,
        status: "Como nuevo",
        title: "",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });
  test("Crear producto sin descripcion, Response status 400", async () => {
    const response = await request(app)
      .post("/products/newProduct/647a09aec2c9e27299401deb")
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
        title: "producto test",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });
  test("Crear producto sin precio, Response status 400", async () => {
    const response = await request(app)
      .post("/products/newProduct/647a09aec2c9e27299401deb")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "opijpojp",
        keywords: ["dhf"],
        sold: false,
        status: "Como nuevo",
        title: "producto test",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(400);
  });
  test("Crear producto sin id, Response status 500", async () => {
    const response = await request(app)
      .post("/products/newProduct/")
      .send({
        booked: false,
        categories: ["644fe58f93ff3b3b028e576b"],
        category: "Coleccionismo",
        datePublication: "2023-06-02T15:25:30.771Z",
        description: "opijpojp",
        keywords: ["dhf"],
        sold: false,
        status: "Como nuevo",
        title: "producto test",
        user: "647a09aec2c9e27299401deb",
      });
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
