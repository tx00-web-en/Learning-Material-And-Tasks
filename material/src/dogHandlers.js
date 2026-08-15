const Dog = require("./dogLib");

// GET /dogs
const getAllDogs = (req, res) => {
  const dogs = Dog.getAll();
  res.json(dogs);
};

// POST /dogs
const createDog = (req, res) => {
  const { name, weight } = req.body;

  const newDog = Dog.addOne(name, weight);

  if (newDog) {
    res.json(newDog);
  } else {
    res.status(500).json({ message: "Failed to create dog" });
  }
};

// GET /dogs/:dogId
const getDogById = (req, res) => {
  const dogId = req.params.dogId;
  const dog = Dog.findById(dogId);
  if (dog) {
    res.json(dog);
  } else {
    res.status(404).json({ message: 'Dog not found' });
  }
};

// PUT /dogs/:dogId
const updateDog = (req, res) => {
  const dogId = req.params.dogId;

  const { name, weight } = req.body;

  const updatedDog = Dog.updateOneById(dogId, { name, weight });

  if (updatedDog) {
    res.json(updatedDog);
  } else {
    res.status(404).json({ message: "Dog not found" });
  }
};

// DELETE /dogs/:dogId
const deleteDog = (req, res) => {
  const dogId = req.params.dogId;

  const isDeleted = Dog.deleteOneById(dogId);

  if (isDeleted) {
    res.json({ message: "Dog deleted successfully" });
  } else {
    res.status(404).json({ message: "Dog not found" });
  }
};

module.exports = {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
};
