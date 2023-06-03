const request = require("supertest");
const app = require("../../app");
const emails = require("email-generator");
const { disconnectDB, connectDB } = require("../../mongo/connection");

describe("POST /login", () => {
  describe("Has username and password", () => {
    // si el mail/contrasenya es correcta torna es 200
    test("Response status 200", async () => {
      const response = await request(app).post("/user/login").send({
        email: "mar.badia2@gmail.com",
        password: "12345",
      });
      expect(response.statusCode).toBe(200);
    });
    // torna es token
    test("Response contains a jwt", async () => {
      const response = await request(app).post("/user/login").send({
        email: "mar.badia2@gmail.com",
        password: "12345",
      });
      expect(response.body["token"]).toBeDefined();
    });
  });

  // Torna un 400 quan falta info
  describe("Missing information", () => {
    test("Response status 400", async () => {
      const response = await request(app).post("/user/login").send({
        email: "existing@mail.com",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});

// probar si es login funciona be
// probant si existeis es mail/contrasenya
// si tot esta be o si falta alguna dada
