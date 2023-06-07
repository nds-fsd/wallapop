const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadCategories } = require("../fixtures/categories.data");

beforeAll(async () => {
  await connectDBTest();
  await loadCategories();
});

describe("GET /Categpry", () => {
  // debe responder con un 200
  test("Response status 200", async () => {
    const response = await request(app).get("/category");
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
