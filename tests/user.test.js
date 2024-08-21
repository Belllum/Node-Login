const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should get all users", async () => {
    const res = await request(app).get("/getUsers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a user", async () => {
    const user = await User.findOne({ email: "johndoe@example.com" });
    const res = await request(app).put(`/updateUser/${user._id}`).send({
      first_name: "Jane",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.first_name).toBe("Jane");
  });

  it("should delete a user", async () => {
    const user = await User.findOne({ email: "johndoe@example.com" });
    const res = await request(app).delete(`/deleteUser/${user._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
