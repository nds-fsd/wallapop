const request = require("supertest");
const app = require("../../app");
const { disconnectDB } = require("../../mongo/connection");

describe("PATCH /product", () => {
  describe("EDITAR bien un producto", () => {
    // debe responder con un 200
    test("Response status 200", async () => {
      const response = await request(app)
        .patch("/products/647a0a0d6ce7d100bb29b7b9")
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
  });

  describe("Crear producto con falta de informacion", () => {
    test("Response status 400", async () => {
      const response = await request(app)
        .patch("/products/647a0a0d6ce7d100bb29b7b9")
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
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar d'editar un producte
// comprobar si falla al no enviar totes ses dades i que tot esta be si
// li paso tot
