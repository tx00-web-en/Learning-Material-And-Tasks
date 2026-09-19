const apiUrl = "http://localhost:4000/api/user/signup";

// Example user data
const user = {
  email: "matti@example.com",
  password: "R3g5T7#gh",
};

const register = async () => {
  try {

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add a new user");
    }

    const json = await response.json();
    console.log("New user added:", json);
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};

register();
