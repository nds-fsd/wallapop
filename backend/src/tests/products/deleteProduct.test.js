const request = require("supertest");
const app = require("../../app");
const { disconnectDB } = require("../../mongo/connection");

describe("DELEAT /product", () => {
  describe("Borrar bien un producto", () => {
    // debe responder con un 200
    test("Response status 200", async () => {
      const response = await request(app).delete(
        "/products/647a2701349bb301138b8521"
      );
      expect(response.statusCode).toBe(200);
    });
  });

  describe("borrar producto con falta de informacion", () => {
    test("Response status 400", async () => {
      const response = await request(app).delete(
        "/products/647a0a0d6ce7d100bb29b7b9"
      );
      expect(response.statusCode).toBe(404);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar de borrar es producte pasantli el id del producte
