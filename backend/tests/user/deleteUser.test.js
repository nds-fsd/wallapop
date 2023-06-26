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
      .delete("/user/647a09aec2c9e27299401deb")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      );

    expect(response.statusCode).toBe(200);
  });
  test("Response status 404", async () => {
    const response = await request(app)
      .delete("/user/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      );

    expect(response.statusCode).toBe(404);
  });
  test("Response status 401, sin token", async () => {
    const response = await request(app).delete(
      "/user/647a09aec2c9e27299401deb"
    );

    expect(response.statusCode).toBe(401);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
