const request = require("supertest");
const app = require("../../app");
const { disconnectDB } = require("../../mongo/connection");
const emails = require("email-generator");

describe("PATCH /user", () => {
  describe("EDITAR bien un user", () => {
    // paso s'info per probar de modificar s'user
    test("Response status 200", async () => {
      const response = await request(app)
        .patch("/products/6479d436f44be4bc58ccdbfe")
        .set(
          "Authorization",
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzlkNDM2ZjQ0YmU0YmM1OGNjZGJmZSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6ImdlbmVyYWwuYmFnZGFzYXJ5YW44ODg0OEBuZXRjb20uY29tIiwiaWF0IjoxNjg1NzMwMTg2LCJleHAiOjMzNzY2NDQzNzJ9._8SSdZxPIm3EX-XKObJNriU-ao9CHVEB0-InKI5M5FM"
        )
        .send({
          name: "Mar",
          surname: "Badia test",
          email: "mar.badia21@gmail.com",
          phone: "67943540",
          photo:
            "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
          birthday: "1997-01-21T00:00:00.000+00:00",
          gender: "Femenino",
        });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Crear producto con falta de informacion", () => {
    // intento canviar dades de user sense es nom,
    // te que tornar un 400 perque no es pot guardar sense es nom
    test("Response status 400", async () => {
      const response = await request(app)
        .patch("/user/647a09aec2c9e27299401deb")
        .set(
          "Authorization",
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2EwOWFlYzJjOWUyNzI5OTQwMWRlYiIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY4NTcyODk0MSwiZXhwIjozMzc2NjQxODgyfQ.0go2b28-S5QVJVzk2-Vvv3TqCGvhHoYYHOL5XeIti6E"
        )
        .send({
          name: "",
          surname: "test apellido",
          email: emails.generateEmail(),
          password: "12345",
          phone: "6000000",
          photo:
            "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
          birthday: "1997-01-21T00:00:00.000+00:00",
          gender: "Prefiero no decirlo",
        });
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});

// Si paso les dades per un json he de crear es token per poder
// modificar s'usuari, sino no em deixara (comprobar aixo tambe)
