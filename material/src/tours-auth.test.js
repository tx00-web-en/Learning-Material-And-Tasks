const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Tour = require("../models/tourModel");
const User = require("../models/userModel");

// Seed data
const tours = [
  {
    name: "Helsinki in 5 Days Tour",
    info: "Discover the charm of Helsinki in 5 days with our expert guides.",
    image: "https://www.course-api.com/images/tours/tour-1.jpeg",
    price: 1900,
  },
  {
    name: "London in 7 Days Tour",
    info: "Explore the best of London in 7 days with our expert guides.",
    image: "https://www.course-api.com/images/tours/tour-2.jpeg",
    price: 2195,
  },
];

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Inactive",
  });
  token = result.body.token;
});

describe("Protected Tour Routes", () => {
  beforeEach(async () => {
    await Tour.deleteMany({});
    await Promise.all([
      api.post("/api/tours").set("Authorization", "Bearer " + token).send(tours[0]),
      api.post("/api/tours").set("Authorization", "Bearer " + token).send(tours[1]),
    ]);
  });

  // ---------------- GET ----------------
  it("should return all tours as JSON when GET /api/tours is called", async () => {
    const response = await api
      .get("/api/tours")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(tours.length);
  });

  it("should return 401 if no token is provided", async () => {
    await api.get("/api/tours").expect(401);
  });

  // ---------------- POST ----------------
  it("should create one tour when POST /api/tours is called", async () => {
    const newTour = {
      name: "Paris in 3 Days Tour",
      info: "Experience the beauty of Paris in just 3 days.",
      image: "https://www.course-api.com/images/tours/tour-3.jpeg",
      price: 1500,
    };
    const response = await api
      .post("/api/tours")
      .set("Authorization", "Bearer " + token)
      .send(newTour)
      .expect(201);

    expect(response.body.name).toBe(newTour.name);
  });

  // ---------------- GET by ID ----------------
  it("should return one tour by ID", async () => {
    const tour = await Tour.findOne();
    const response = await api
      .get(`/api/tours/${tour._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.name).toBe(tour.name);
  });

  // ---------------- PUT ----------------
  it("should update one tour by ID", async () => {
    const tour = await Tour.findOne();
    const updatedTour = { info: "Updated tour information.", price: 2000 };

    const response = await api
      .put(`/api/tours/${tour._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedTour)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.info).toBe(updatedTour.info);

    const updatedTourCheck = await Tour.findById(tour._id);
    expect(updatedTourCheck.price).toBe(updatedTour.price);
  });

  // ---------------- DELETE ----------------
  it("should delete one tour by ID", async () => {
    const tour = await Tour.findOne();
    await api
      .delete(`/api/tours/${tour._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const tourCheck = await Tour.findById(tour._id);
    expect(tourCheck).toBeNull();
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
