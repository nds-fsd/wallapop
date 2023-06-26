const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadProducts } = require("../fixtures/products.data");
const { loadChatRoom } = require("../fixtures/chatRoom.data");
const { loadMessages } = require("../fixtures/messages.data");
const { loadTransaction } = require("../fixtures/transaction.data");

beforeAll(async () => {
  await connectDBTest();
  await loadProducts();
  await loadChatRoom();
  await loadMessages();
  await loadTransaction();
});

describe("POST /transactions", () => {
  // debe responder con un 200
  test("crear un transactions, Response status 201", async () => {
    const response = await request(app)
      .post("/transactions/newTransaction/646b7ead6a04146e10047a3a")
      .send({
        address: "carrer proba",
        product: "6481d6f760f5f3f455be0a7a",
        date: "2023-06-25T20:48:14.005Z",
      });
    expect(response.statusCode).toBe(201);
  });
  test("crear un transactions sin address, Response status 400", async () => {
    const response = await request(app)
      .post("/transactions/newTransaction/648e04f769eda0696e70ba6a")
      .send({
        date: "2023-06-22T16:55:45.705+00:00",
        product: "6481dd1260f5f3f455be0b32",
      });
    expect(response.statusCode).toBe(400);
  });
  test("crear un transactions sin product, Response status 400", async () => {
    const response = await request(app)
      .post("/transactions/newTransaction/648e04f769eda0696e70ba6a")
      .send({
        date: "2023-06-22T16:55:45.705+00:00",
      });
    expect(response.statusCode).toBe(400);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
