const request = require("supertest");
const app = require("../../app");
const emails = require("email-generator");
const { disconnectDB } = require("../../mongo/connection");

describe("POST /product", () => {
  describe("crear bien un producto", () => {
    // debe responder con un 200
    test("Response status 200", async () => {
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
  });

  describe("Crear producto con falta de informacion", () => {
    test("Response status 400", async () => {
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
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar de crear un nou producte, comprobant si pasantli totes
// ses dades be dona el ok i que falli quan no son correctes o faltin
