// The data model for a dog is as follows
/*
{
    "name": "Buddy",
    "weight": 20
}
*/

let dogArray = [];

let nextId = 1;

function getAll() {
    return dogArray;
}

function addOne(name, weight) {
    // Check if any parameter is empty or undefined
    if (!name || weight === undefined) {
        return false;
    }

    const newDog = {
        id: nextId++,
        name,
        weight
    };

    dogArray.push(newDog);
    return newDog;
}

function findById(id) {
    const numericId = Number(id);
    const dog = dogArray.find(item => item.id === numericId);
    if (dog) {
        return dog;
    } else {
        return false;
    }
}

function updateOneById(id, updatedData) {
    const dog = findById(id);
    if (dog) {
        // Update properties only if provided in updatedData
        if (updatedData.name) {
            dog.name = updatedData.name;
        }
        if (updatedData.weight !== undefined) {
            dog.weight = updatedData.weight;
        }
        return dog;
    }
    return false;
}

function deleteOneById(id) {
    const dog = findById(id);
    if (dog) {
        const initialLength = dogArray.length;
        dogArray = dogArray.filter(dog => dog.id !== Number(id));
        return dogArray.length < initialLength; // Indicate successful deletion if the length has decreased
    }
    return false; // Return false if the item was not found
}

if (require.main === module) {
    // Add dog
    let result = addOne("Buddy", 20);
    console.log(result);
    // Add another dog
    result = addOne("Mittens", 10);
    console.log(result);

    console.log("getAll called:", getAll());

    console.log("findById called:", findById(1));

    console.log("updateOneById called:", updateOneById(1, { weight: 22 }));
    console.log("findById called after item updated:", findById(1));

    console.log("deleteOneById called:", deleteOneById(1));
    console.log("findById called after item deleted:", findById(1));
}

Dog = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = Dog;
