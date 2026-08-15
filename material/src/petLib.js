/* // The data model for pet is as follows
{
    "name": "Buddy",
    "species": "Dog",
    "age": 1,
    "color": "Brown",
    "weight": 2
  }
 */
let petArray = [];

let nextId = 1;

function getAll() {
  return petArray;
}

function addOne(name, species, age, color, weight) {
  // Check if any parameter is empty or undefined
  if (!name || !species || !age || !color || !weight) {
    return false;
  }

  const newPet = {
    id: nextId++,
    name,
    species,
    age,
    color,
    weight,
  };

  petArray.push(newPet);
  return newPet;
}

function findById(id) {
  const pet = petArray.find((item) => item.id == id);
  if (pet) {
    return pet;
  } else {
    return false;
  }
}

function updateOneById(id, updatedData) {
  const pet = findById(id);
  if (pet) {
    // Update properties only if provided in updatedData
    if (updatedData.name) {
      pet.name = updatedData.name;
    }
    if (updatedData.species) {
      pet.species = updatedData.species;
    }
    if (updatedData.age) {
      pet.age = updatedData.age;
    }
    if (updatedData.color) {
      pet.color = updatedData.color;
    }
    if (updatedData.weight) {
      pet.weight = updatedData.weight;
    }
    return pet;
  }
  return false;
}

function deleteOneById(id) {
  const pet = findById(id);
  if (pet) {
    const initialLength = petArray.length;
    petArray = petArray.filter((pet) => pet.id != id);
    return petArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}

if (require.main === module) {
  // Add pet
  let result = addOne("Buddy", "Dog", 3, "Brown", 20);
  console.log(result);
  // Add another pet
  result = addOne("Mittens", "Cat", 2, "Black", 10);
  console.log(result);

  console.log("getAll called:", getAll());

  console.log("findById called:", findById(1));

  console.log("updateOne called:", updateOneById(1, { age: 4, weight: 22 }));
  console.log("findById called after item updated:", findById(1));

  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

Pet = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Pet;
