const request = require("supertest");
const db = require("../models/index");
const app = require("../app");



describe("Event Ease test cases", () => {
  beforeAll(async () => {
    server = app.listen(4040, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });
  test("User Signup", async () => {
    const response = await request(server).post("/api/users/signup").send({
        name:"Nithish",
        email:"nithish18@gmail.com",
        password:"123456789"
    });
    expect(response.statusCode).toBe(200);
  });
  test("User Login", async () => {
    const response = await request(server).post("/api/users/login").send({
        email:"nithish18@gmail.com",
        password:"123456789"

    });
    expect(response.statusCode).toBe(200);
  });
});