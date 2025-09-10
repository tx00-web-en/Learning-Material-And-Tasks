# Lab: JWT

## Part 1/2:

This part demonstrates how to create, decode, and verify JSON Web Tokens (JWTs) using the `jsonwebtoken` library in JavaScript.

**Step 1: Setting Up Your Project**

1. Create a new folder for your project.
2. Open a terminal and navigate to your project folder.
3. Initialize a new Node.js project by running the following command:
```sh
npm init -y
```
4. Install the `jsonwebtoken` library by running: `npm install jsonwebtoken`

**Step 2: Create a JavaScript File**
1. Create a JavaScript file (e.g., `jwt_lab.js`) in your project folder.

**Step 3: Import the `jsonwebtoken` Library**
```javascript
const jwt = require('jsonwebtoken');
```

**Step 4: Creating and Signing a JWT**
```javascript
// Function to create and sign a JWT
function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };
  const secretKey = 'yourSecretKey'; // Replace with your secret key

  // Sign the JWT with the payload and secret key
  const token = jwt.sign(payload, secretKey);

  console.log('JWT Token:', token);
}

// Call the function to create and sign a JWT
createJWT();
```

**Step 5: Verifying a JWT**
```javascript
// Function to verify a JWT
function verifyJWT(token) {
  const secretKey = 'yourSecretKey'; // Replace with your secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
    } else {
      console.log('JWT Verified. Decoded:', decoded);
    }
  });
}

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtTokenToVerify = 'yourTokenHere';

// Call the function to verify the JWT
verifyJWT(jwtTokenToVerify);
```

**Step 6: Decoding a JWT**
```javascript
// Function to decode a JWT
function decodeJWT(token) {
  const decoded = jwt.decode(token);

  console.log('Decoded JWT:', decoded);
}

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtToken = 'yourTokenHere';

// Call the function to decode the JWT
decodeJWT(jwtToken);
```

**Step 7: Running the Lab**
1. Open your terminal and navigate to your project folder.
2. Run the lab by executing the JavaScript file:
```sh
node jwt_lab.js
```

You would use `jwt.decode(token)` when you need to extract the payload data from a JSON Web Token (JWT) without verifying its signature. 

Here are some common scenarios where you might use `jwt.decode(token)`:

1. Frontend Token Handling: In frontend applications, you might receive JWTs from an authentication server and need to extract user information from the token for display or use within the application. `jwt.decode(token)` can be used for this purpose.
2. Viewing Token Payload: If you need to inspect the contents of a JWT, such as its claims or user information, without performing any authentication or authorization checks, you can use `jwt.decode(token)` to extract the payload and examine its contents.
3. Debugging or Logging: During development or debugging, you might want to log or display the payload data of a JWT for diagnostic purposes. `jwt.decode(token)` allows you to easily extract and display the payload in a readable format.

It's important to note that `jwt.decode(token)` does not perform any verification of the token's signature or validity. Therefore, you should only use it in scenarios where verifying the authenticity and integrity of the token is not necessary. If you need to perform authentication or authorization checks, you should use `jwt.verify(token, secretOrPublicKey)` instead, which verifies the token's signature and expiration time.

## Part 2/2
---------


1. **Download the Sample Code**: 
   - Clone the [sample code](https://github.com/tx00-resources-en/jwt-example) 

2. **Install Dependencies**:
   - Navigate to the directory where you downloaded the sample code.
   - Run the command `npm install`. 

3. **Start the Server**:
   - After installing the dependencies, you can start the server by running one of the following commands:
     - If you're running the server in production mode, use `npm start`.
     - If you're running the server in development mode, use `npm run dev`.
   - Type the chosen command in your terminal and press Enter. This will start the server, and you'll see a message indicating that the server is running on a specific port (port 3001).

4. **Register a User**:
   - Open Postman
   - Create a new request and set it to a POST method.
   - Enter the URL `http://localhost:3001/api/users` in the request URL field.
   - In the request body, select the JSON format and add the following data:
     ```
     {
         "username": "Matti",
         "password": "StrongPassword"
     }
     ```
   - Send the request. You should receive a response indicating that the user has been successfully registered with a `token`.

5. **Access the Protected Route**:
   - After registering the user, copy the token from the response.
   - Create a new request in Postman.
   - Set the request to a GET method.
   - Enter the URL `http://localhost:3001/api/protectedroute`.
   - To authenticate using JWT token, you need to set the Authorization header. Click on the "Authorization" tab.
   - Select "Bearer Token" from the dropdown menu.
   - Enter the JWT token in the "Token" field. 
   - Send the request. If everything is set up correctly, you should receive a response indicating that you've successfully accessed the protected route.


### (Optional) JWT in action

Discuss in groups how the following code works:

- `jwt.sign()` in [practice](https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-14/backend/controllers/userController.js)
- `jwt.verify` in [practice](https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-14/backend/middleware/requireAuth.js)

