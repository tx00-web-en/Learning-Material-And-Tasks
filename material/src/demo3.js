const apiUrl = "http://localhost:4000/api/user/login";

// Example user data
const user = {
  email: "matti@example.com",
  password: "R3g5T7#gh",
};

const login = async () => {
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
    console.log("Login succesful:", json);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

login();
