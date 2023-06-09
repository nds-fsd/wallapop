const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadCategories } = require("../fixtures/categories.data");

beforeAll(async () => {
  await connectDBTest();
  await loadCategories();
});

describe("POST /categoria", () => {
  // debe responder con un 200
  test("crear bien una categoria, Response status 201", async () => {
    const response = await request(app).post("/category").send({
      title: "categoria test",
      logo: "icon-todo",
      path: "test",
    });
    expect(response.statusCode).toBe(201);
  });

  test("Crear una categoria sin todos los datos, Response status 400", async () => {
    const response = await request(app).post("/category").send({
      title: "categoria test",
      path: "test",
    });
    expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});