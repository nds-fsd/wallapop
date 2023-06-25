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
  test("crear un message, Response status 201", async () => {
    const response = await request(app)
      .post("/message/6497707b6bf946d3bae4666c")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4MDkzMDNhNzZmOTc2NjM5MDFlYSIsIm5hbWUiOiJNYXIiLCJlbWFpbCI6IlwiamVyYWxkLnNoYXJlcjY3NzcxQG1haWxjbHViLmZyXCIiLCJpYXQiOjE2ODYxNDMxMjMsImV4cCI6MzM3NzQ3MDI0Nn0.9holJ24qprV5A4_IyTR7lcW-b4xXpxYmH-mfRSqWOw0"
      )
      .send({
        body: "Holaaa",
        check: false,
        created_at: "2023-06-24T21:42:21.155+00:00",
      });
    expect(response.statusCode).toBe(201);
  });

  // test("Crear producto con falta de informacion, Response status 400", async () => {
  //   const response = await request(app)
  //     .post("/products/newProduct/647a09aec2c9e27299401deb")
  //     .send({
  //       booked: false,
  //       categories: ["644fe58f93ff3b3b028e576b"],
  //       category: "Coleccionismo",
  //       datePublication: "2023-06-02T15:25:30.771Z",
  //       description: "",
  //       keywords: ["dhf"],
  //       price: 4564,
  //       sold: false,
  //       status: "Como nuevo",
  //       title: "producto test",
  //       user: "647a09aec2c9e27299401deb",
  //     });
  //   expect(response.statusCode).toBe(400);
  //});

  afterAll(() => {
    disconnectDBTest();
  });
});
