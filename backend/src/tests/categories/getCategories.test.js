const request = require("supertest");
const app = require("../../app");
const { disconnectDB } = require("../../mongo/connection");

describe("GET /Categpry", () => {
  describe("Get de todas las categorias", () => {
    // debe responder con un 200
    test("Response status 200", async () => {
      const response = await request(app).get("/category");
      expect(response.statusCode).toBe(200);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar de fer un get de totes ses categories
// nose com comprobar si falla
