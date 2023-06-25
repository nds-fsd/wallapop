const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("PATCH /user", () => {
  // paso s'info per probar de modificar s'user
  test("Response status 200", async () => {
    const response = await request(app)
      .patch("/user/6461693bf9a77cdb3d869ca5")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        name: "Mar",
        surname: "Badia test",
        email: "mar.badia21@gmail.com",
        phone: "67943540",
        birthday: "1997-01-21T00:00:00.000+00:00",
        gender: "Femenino",
      });
    expect(response.statusCode).toBe(201);
  });

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

  afterAll(() => {
    disconnectDBTest();
  });
});