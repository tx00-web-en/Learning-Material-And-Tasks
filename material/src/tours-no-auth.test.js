const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Tour = require("../models/tourModel");

const tours = [
  {
    name: "Helsinki in 5 Days Tour",
    info: "Discover the charm of Helsinki in 5 days with our expert guides.",
    image: "https://www.course-api.com/images/tours/tour-1.jpeg",
    price: "1900",
  },
  {
    name: "London in 7 Days Tour",
    info: "Explore the best of London in 7 days with our expert guides.",
    image: "https://www.course-api.com/images/tours/tour-2.jpeg",
    price: "2195",
  },
];

describe("Tour Controller", () => {
  beforeEach(async () => {
    await Tour.deleteMany({});
    await Tour.insertMany(tours);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/tours
  it("should return all tours as JSON when GET /api/tours is called", async () => {
    const response = await api
      .get("/api/tours")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(tours.length);
  });

  // Test POST /api/tours
  it("should create a new tour when POST /api/tours is called", async () => {
    const newTour = {
      name: "Stockholm in 6 Days Tour",
      info: "Explore the best of Stockholm in 6 days with our expert guides.",
      image: "https://www.course-api.com/images/tours/tour-3.jpeg",
      price: "1700",
    };

    await api
      .post("/api/tours")
      .send(newTour)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const toursAfterPost = await Tour.find({});
    expect(toursAfterPost).toHaveLength(tours.length + 1);
    const tourNames = toursAfterPost.map((tour) => tour.name);
    expect(tourNames).toContain(newTour.name);
  });

  // Test GET /api/tours/:id
  it("should return one tour by ID when GET /api/tours/:id is called", async () => {
    const tour = await Tour.findOne();
    await api
      .get(`/api/tours/${tour._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing tour ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/tours/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/tours/:id
  it("should update one tour with partial data when PUT /api/tours/:id is called", async () => {
    const tour = await Tour.findOne();
    const updatedTour = {
      info: "Updated info",
      price: "2500",
    };

    await api
      .put(`/api/tours/${tour._id}`)
      .send(updatedTour)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedTourCheck = await Tour.findById(tour._id);
    expect(updatedTourCheck.info).toBe(updatedTour.info);
    expect(updatedTourCheck.price).toBe(updatedTour.price);
  });

  it("should return 400 for invalid tour ID when PUT /api/tours/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/tours/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/tours/:id
  it("should delete one tour by ID when DELETE /api/tours/:id is called", async () => {
    const tour = await Tour.findOne();
    await api.delete(`/api/tours/${tour._id}`).expect(204);

    const deletedTourCheck = await Tour.findById(tour._id);
    expect(deletedTourCheck).toBeNull();
  });

  it("should return 400 for invalid tour ID when DELETE /api/tours/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/tours/${invalidId}`).expect(400);
  });
});