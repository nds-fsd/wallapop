const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadUser } = require("../fixtures/users.data");

beforeAll(async () => {
  await connectDBTest();
  await loadUser();
});

describe("DELEAT /user", () => {
  // eliminem user
  test("Response status 200", async () => {
    const response = await request(app)
      .delete("/user/6479f342969576fbf65f8f0a")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzlmMzQyOTY5NTc2ZmJmNjVmOGYwYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6ImZsb3lkLmxlYWgyMTExNUBjb3VudHJ5bG92ZXIuY29tIiwiaWF0IjoxNjg1NzMwNjc3LCJleHAiOjMzNzY2NDUzNTR9.RG5G-9IMUFruu-osJkpti08QXSompe1MdYS_G66fsNI"
      );

    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});

// tenc que probar d'eliminar s'user amb token i sense token
// comprobar si falla o no sense
