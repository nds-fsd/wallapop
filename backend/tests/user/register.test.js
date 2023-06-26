const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("POST /register", () => {
  describe("descripcion", () => {
    // comprobar el status al registrar un user
    test("Response status 201", async () => {
      const response = await request(app).post("/user/register").send({
        name: "Mar",
        surname: "Badia",
        email: emails.generateEmail(),
        password: "12345",
        phone: "679234351",
        photo:
          "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Prefiero no decirlo",
      });
      expect(response.statusCode).toBe(201);
    });

    // comprobar que devuelve un JWT
    test("Response status 201 whit token", async () => {
      const response = await request(app).post("/user/register").send({
        name: "Mar",
        surname: "Badia",
        email: emails.generateEmail(),
        password: "12345",
        phone: "75159752",
        photo:
          "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Prefiero no decirlo",
      });
      expect(response.body["token"]).toBeDefined;
    });
  });

  // Tener el error capturado cuando ya esta registrado el email
  describe("Email already registered", () => {
    test("Response status 400", async () => {
      const response = await request(app).post("/user/register").send({
        name: "Mar",
        surname: "Badia",
        email: "m.badia@gmail.com",
        password: "12345",
        phone: "600111000",
        photo:
          "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Prefiero no decirlo",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Response status 400, sin mail", async () => {
      const response = await request(app).post("/user/register").send({
        name: "Mar",
        surname: "Badia",
        email: "",
        password: "12345",
        phone: "600111000",
        photo:
          "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Prefiero no decirlo",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Response status 400, sin passsword", async () => {
      const response = await request(app).post("/user/register").send({
        name: "Mar",
        surname: "Badia",
        email: "m.badia@gmail.com",
        password: "",
        phone: "600111000",
        photo:
          "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Prefiero no decirlo",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
