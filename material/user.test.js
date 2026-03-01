const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// ────────────────── POST /api/users/signup ──────────────────
describe("POST /api/users/signup", () => {
  describe("when the payload is valid", () => {
    it("should signup a new user with status 201 and return a token", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-4567"
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe(userData.email);

      // Verify user was actually saved in the database
      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(userData.name);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return 400 if required fields are missing", async () => {
      const userData = {
        email: "incomplete@example.com",
        password: "R3g5T7#gh",
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(400);

      expect(result.body).toHaveProperty("error");

      // Verify the user was NOT created
      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).toBeNull();
    });
  });

  describe("when the email is already taken", () => {
    it("should return 400 for duplicate email", async () => {
      const userData = {
        name: "First User",
        email: "duplicate@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-111-2222",
        gender: "Male",
        date_of_birth: "1990-01-01",
        membership_status: "Active",
      };

      // Create the first user
      await api.post("/api/users/signup").send(userData).expect(201);

      // Try to create a second user with the same email
      const result = await api
        .post("/api/users/signup")
        .send({ ...userData, name: "Second User" })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });
  });
});

// ────────────────── POST /api/users/login ──────────────────
describe("POST /api/users/login", () => {
  // Sign up a user before each login test
  beforeEach(async () => {
    await api.post("/api/users/signup").send({
      name: "Login Tester",
      email: "login@example.com",
      password: "R3g5T7#gh",
      phone_number: "09-123-4567",
      gender: "Male",
      date_of_birth: "1992-03-20",
      membership_status: "Active",
    });
  });

  describe("when the credentials are valid", () => {
    it("should login and return a token with status 200", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "login@example.com",
          password: "R3g5T7#gh",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe("login@example.com");
    });
  });

  describe("when the credentials are invalid", () => {
    it("should return 400 with a wrong password", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "login@example.com",
          password: "WrongPassword1!",
        })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });

    it("should return 400 with a non-existing email", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "nobody@example.com",
          password: "R3g5T7#gh",
        })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
