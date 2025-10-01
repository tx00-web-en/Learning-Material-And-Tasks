const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const api = supertest(app);

beforeAll(async () => {
    await User.deleteMany({});
});

describe("User Controller", () => {
    it("should signup a new user with valid credentials", async () => {
        const userData = {
            name: "John Doe",
            email: "john@example.com",
            password: "P-password123",
            phone_number: "1234567890",
            gender: "Male",
            date_of_birth: "1990-01-01",
            membership_status: "Inactive",
        };

        const result = await api.post("/api/users/signup").send(userData);

        expect(result.status).toBe(201);
        expect(result.body).toHaveProperty("token");
    });


    it("should login a user with valid credentials", async () => {
        const userData = {
            email: "john@example.com",
            password: "P-password123",
        };

        const result = await api.post("/api/users/login").send(userData);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("token");
    });

});

afterAll(() => {
    mongoose.connection.close();
});