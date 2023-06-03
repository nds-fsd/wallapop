const request = require("supertest");
const app = require("../../app");
const emails = require("email-generator");
const { disconnectDB } = require("../../mongo/connection");

describe("POST /categoria", () => {
  describe("crear bien una categoria", () => {
    // debe responder con un 200
    test("Response status 201", async () => {
      const response = await request(app).post("/category").send({
        title: "categoria test",
        logo: "icon-todo",
        path: "test",
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Crear una categoria sin todos los datos", () => {
    test("Response status 400", async () => {
      const response = await request(app).post("/category").send({
        title: "categoria test",
        path: "test",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar de crear una categoria pasanli totes les dades correctes
// i que falla si no li envies totes ses dades
