const request = require("supertest");
const app = require("../../src/app");
const emails = require("email-generator");
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

describe("POST /message", () => {
  // debe responder con un 200
  test("crear un message, Response status 200", async () => {
    const response = await request(app)
      .post("/message/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        chat_room_id: "6497707b6bf946d3bae4666c",
        body: "Holaaa",
        check: false,
        created_at: "2023-06-24T21:42:21.155+00:00",
      });
    expect(response.statusCode).toBe(200);
  });
  test("crear un message sin bearer, Response status 401", async () => {
    const response = await request(app).post("/message/").send({
      chat_room_id: "6497707b6bf946d3bae4666c",
      body: "Holaaa",
      check: false,
      created_at: "2023-06-24T21:42:21.155+00:00",
    });
    expect(response.statusCode).toBe(401);
  });
  test("crear un message sin chat existente, Response status 500", async () => {
    const response = await request(app)
      .post("/message/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        chat_room_id: "6497707b6bf94",
        body: "Holaaa",
        check: false,
        created_at: "2023-06-24T21:42:21.155+00:00",
      });
    expect(response.statusCode).toBe(500);
  });
  test("crear un message sin body, Response status 400", async () => {
    const response = await request(app)
      .post("/message/")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        chat_room_id: "6497707b6bf946d3bae4666c",
        check: false,
        created_at: "2023-06-24T21:42:21.155+00:00",
      });
    expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
