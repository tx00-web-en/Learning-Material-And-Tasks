const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Tour = require("../models/tourModel");

// Seed data for tests
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

// Reset the tours collection before each test
beforeEach(async () => {
  await Tour.deleteMany({});
  await Tour.insertMany(tours);
});

// ---------------- GET ----------------
describe("GET /api/tours", () => {
  it("should return all tours as JSON", async () => {
    const response = await api
      .get("/api/tours")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(tours.length);
    expect(response.body[0].name).toBe(tours[0].name);
  });
});

describe("GET /api/tours/:id", () => {
  it("should return one tour by ID", async () => {
    const tour = await Tour.findOne();
    const response = await api
      .get(`/api/tours/${tour._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.name).toBe(tour.name);
  });

  it("should return 404 for a non-existing tour ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/tours/${nonExistentId}`).expect(404);
  });
});

// ---------------- POST ----------------
describe("POST /api/tours", () => {
  it("should create a new tour", async () => {
    const newTour = {
      name: "Stockholm in 6 Days Tour",
      info: "Explore the best of Stockholm in 6 days with our expert guides.",
      image: "https://www.course-api.com/images/tours/tour-3.jpeg",
      price: 1700,
    };

    const response = await api
      .post("/api/tours")
      .send(newTour)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.name).toBe(newTour.name);

    const toursAfterPost = await Tour.find({});
    expect(toursAfterPost).toHaveLength(tours.length + 1);
  });
});

// ---------------- PUT ----------------
describe("PUT /api/tours/:id", () => {
  it("should update a tour with partial data", async () => {
    const tour = await Tour.findOne();
    const updatedTour = { info: "Updated info", price: 2500 };

    const response = await api
      .put(`/api/tours/${tour._id}`)
      .send(updatedTour)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.info).toBe(updatedTour.info);

    const updatedTourCheck = await Tour.findById(tour._id);
    expect(updatedTourCheck.price).toBe(updatedTour.price);
  });

  it("should return 400 for invalid tour ID", async () => {
    const invalidId = "12345"; // invalid format, not a valid ObjectId
    await api.put(`/api/tours/${invalidId}`).send({}).expect(400);
  });
});

// ---------------- DELETE ----------------
describe("DELETE /api/tours/:id", () => {
  it("should delete a tour by ID", async () => {
    const tour = await Tour.findOne();
    await api.delete(`/api/tours/${tour._id}`).expect(204);

    const deletedTourCheck = await Tour.findById(tour._id);
    expect(deletedTourCheck).toBeNull();
  });

  it("should return 400 for invalid tour ID", async () => {
    const invalidId = "12345"; // invalid format
    await api.delete(`/api/tours/${invalidId}`).expect(400);
  });
});

// Close DB connection once after all tests in this file
afterAll(async () => {
  await mongoose.connection.close();
});
