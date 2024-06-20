const request = require("supertest");
const app = require("./../server");

describe("POST /chat", () => {
  it("should respond with valid data", async () => {
    const testPayload = { input: "How are you" };

    const response = await request(app)
      .post("/chat")
      .send(testPayload)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(typeof response.body.response).toBe("string");
    expect(response.body.response).toBeTruthy();
  });

  it("should return 400 if input is missing", async () => {
    const response = await request(app)
      .post("/chat")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toEqual({
      error: "Input is missing or empty",
    });
  });
});
