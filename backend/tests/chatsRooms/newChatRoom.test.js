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

describe("POST /chat-room", () => {
  // debe responder con un 200
  test("create new chatroom, Response status 201", async () => {
    const response = await request(app)
      .post("/chat-room/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        product_id: "646b7ead6a04146e10047a3a",
        owner_id: "6461693bf9a77cdb3d869ca5",
      });
    expect(response.statusCode).toBe(201);
  });
  test("Create new Chatroom, Response status 500", async () => {
    const response = await request(app)
      .post("/chat-room/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        product_id: "",
        owner_id: "6461693bf9a77cdb3d869ca5",
      });

    expect(response.statusCode).toBe(500);
  });
  test("Create new Chatroom sin bearer, Response status 401", async () => {
    const response = await request(app).post("/chat-room/").send({
      product_id: "",
      owner_id: "6461693bf9a77cdb3d869ca5",
    });

    expect(response.statusCode).toBe(401);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
