const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");

console.log("HOlaaa estas en el test de login");
beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("POST /login", () => {
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
  test("Response 400, sin coincidir mail con contraseña", async () => {
    const response = await request(app).post("/user/login").send({
      email: "m.badia@gmail.com",
      password: "probandoContraseña",
    });
    expect(response.statusCode).toBe(400);
  });
  test("Response status 400, sin password", async () => {
    const response = await request(app).post("/user/login").send({
      email: "m.badia@gmail.com",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Response status 400, sin mail", async () => {
    const response = await request(app).post("/user/login").send({
      password: "12345",
    });
    expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
