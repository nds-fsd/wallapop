const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");
const { loadChatRoom } = require("../fixtures/chatRoom.data");
const { loadMessages } = require("../fixtures/messages.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
  await loadChatRoom();
  await loadMessages();
});

describe("GET /chat-room", () => {
  // debe responder con un 200
  test("Get product chatroom, Response status 200", async () => {
    const response = await request(app)
      .get("/chat-room/product/6497707b6bf946d3bae4666c")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      );
    expect(response.statusCode).toBe(200);
  });
  test("Get product chatroom, Response status 404 sin id del chatRoom", async () => {
    const response = await request(app)
      .get("/chat-room/product/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      );
    expect(response.statusCode).toBe(404);
  });

  test("Get by id chatroom sin token, Response status 401", async () => {
    const response = await request(app).get(
      "/chat-room/6497707b6bf946d3bae4666c"
    );

    expect(response.statusCode).toBe(401);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
