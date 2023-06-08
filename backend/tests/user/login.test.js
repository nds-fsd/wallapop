const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("POST /login", () => {
  describe("Has username and password", () => {
    // si el mail/contrasenya es correcta torna es 200
    test("Response status 200", async () => {
      const response = await request(app).post("/user/login").send({
        email: "m.badia@gmail.com",
        password: "12345",
      });
      expect(response.statusCode).toBe(200);
    });
    // torna es token
    test("Response contains a jwt", async () => {
      const response = await request(app).post("/user/login").send({
        email: "m.badia@gmail.com",
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
    disconnectDBTest();
  });
});