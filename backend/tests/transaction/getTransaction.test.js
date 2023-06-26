const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadTransaction } = require("../fixtures/transaction.data");

beforeAll(async () => {
  await connectDBTest();
  await loadTransaction();
});

describe("GET /transactions by id", () => {
  // debe responder con un 200
  test("get transactions, Response status 200", async () => {
    const response = await request(app).get(
      "/transactions/649335971252e4732fc9d7b8"
    );
    expect(response.statusCode).toBe(200);
  });
  test("get transactions, Response status 404", async () => {
    const response = await request(app).get("/transactions/");
    expect(response.statusCode).toBe(404);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
