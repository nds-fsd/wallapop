const request = require("supertest");
const app = require("../../src/app");
const { connectDBTest, disconnectDBTest } = require("../connection");
const { loadTransaction } = require("../fixtures/transaction.data");

beforeAll(async () => {
  await connectDBTest();
  await loadTransaction();
});

describe("GET /transactions by id USer", () => {
  // debe responder con un 200
  test("get transactions, Response status 200", async () => {
    const response = await request(app).get(
      "/transactions/getbyuser/6460c2f2980f4e977122dc3c"
    );
    expect(response.statusCode).toBe(200);
  });
  test("get transactions, Response status 404", async () => {
    const response = await request(app).get("/transactions/getbyuser/");
    expect(response.statusCode).toBe(404);
  });
  test("get transactions, Response status 500", async () => {
    const response = await request(app).get(
      "/transactions/getbyuser/srshtrsdtr"
    );
    expect(response.statusCode).toBe(500);
  });

  afterAll(() => {
    disconnectDBTest();
  });
});
