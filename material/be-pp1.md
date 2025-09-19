# Pair Programming Part 1: Build JWT from Scratch
---

### **Objective**

1. Understand the structure of a JWT.
2. Write functions to:
   - Base64URL encode/decode data.
   - Hash data for creating and verifying JWTs.
   - Simulate `jwt.sign()` to create a JWT.
   - Simulate `jwt.verify()` to validate a JWT.
3. Test the implementation.

---

### **Step 1: Understanding the JWT Structure**

- JWT consists of three parts:
  1. **Header**: Metadata (e.g., the algorithm used).
  2. **Payload**: Data (e.g., user information).
  3. **Signature**: Ensures integrity by hashing the header and payload with a secret.

Example JWT:
```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc5ZjY3NzhlMTg3NDA2YjY0Mzk2YjciLCJpYXQiOjE2Njg5MzczMzYsImV4cCI6MTY2OTE5NjUzNn0.dWq1GPvujtGp168vSu3z_dtZBNd_ohl0HNi1vylqjT8
```

---

### **Step 2: Project Setup**

1. Create a file named `jwt.js` where you will write all your code for this project.
2. Use Node.js's built-in `crypto` module for hashing functionality. Since it is a core module, there’s no need to install it via npm or manage dependencies for this step.
3. You do not need a `node_modules` directory or a `.env` file for excluding dependencies in this case because this exercise doesn’t require additional npm packages.

---

### **Step 3: Base64URL Encoding and Decoding**

Write a function to encode and decode strings using Base64URL.

<details>
<summary>How to: Base64URL Implementation</summary>

```javascript
// Helper: Base64URL Encode/Decode

// Encode to Base64URL
function base64UrlEncode(data) {
    return Buffer.from(data)              // Convert the input string into a Buffer (binary data)
        .toString("base64")               // Encode that binary data into standard Base64
        .replace(/=/g, "")                // Remove '=' padding (optional in Base64URL)
        .replace(/\+/g, "-")              // Replace '+' with '-' (URL-safe)
        .replace(/\//g, "_");              // Replace '/' with '_' (URL-safe)
}

// Decode from Base64URL
function base64UrlDecode(encodedData) {
    const base64 = encodedData
        .replace(/-/g, "+")               // Convert '-' back to '+'
        .replace(/_/g, "/");               // Convert '_' back to '/'
    return Buffer.from(base64, "base64")   // Decode Base64 back to bytes
        .toString();                       // Convert bytes back to a normal string
}

// Test
console.log("Encoded Data:", base64UrlEncode("hello")); // aGVsbG8
console.log("Decoded Data:", base64UrlDecode("aGVsbG8")); // hello
```

**Why Base64URL?**
- URLs are unsafe for `+` and `/`, so Base64URL replaces them with `-` and `_` respectively.
- Trailing `=` padding is removed.

</details>

---

### **Step 4: Hashing**

Create a function to hash the header, payload, and secret using HMAC-SHA256. 

<details>
<summary>How to: Hash Function Implementation</summary>

```javascript
const crypto = require("crypto");

// Hash function
function hash(payload, secret, header) {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("hex");
}

// Test
// const header1 = { alg: "HS256", typ: "JWT" }; // Customizable
// const payload1 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
// const secret1 = "my-secret-key";

// console.log("Hash:", hash(payload1, secret1, header1));
```

> **Note:** In real applications, you should use a strong secret and save it in `.env` file. You can generate one as follows: 
```javascript
const mySecret = require("crypto").randomBytes(64).toString("hex");
console.log("Generated Secret:", mySecret); // Example strong secret
```

</details>


---

### **Step 5: Simulate `jwt.sign()`**

Write a function to create a JWT. 

**Steps:**
1. Accept payload, secret, and header as parameters.
2. Encode the header and payload using Base64URL.
3. Generate a signature using the hash function.
4. Combine all parts to create the JWT.

<details>
<summary>How to: Sign Function Implementation</summary>

```javascript
// Simulate jwt.sign()
function jwtSign(payload, secret, header = { alg: "HS256", typ: "JWT" }) {
  // Step 1: Encode header and payload to Base64URL
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Step 2: Create a signature using the encoded header, payload, and secret
  const signature = hash(payload, secret, header);

  // Step 3: Combine all parts into the JWT structure
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Example Usage
// const payload2 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Expires in 60 seconds
// const mySecret2 = require("crypto").randomBytes(64).toString("hex"); // Strong secret
// const header2 = { alg: "HS256", typ: "JWT" }; // Customizable

// console.log("Generated Secret:", mySecret2);
// const token2 = jwtSign(payload2, mySecret2, header2);
// console.log("JWT:", token2);
```
</details>

---

### **Step 6: Simulate `jwt.verify()`**

Write a function to:
1. Decode the JWT.
2. Recreate the signature and compare it with the one in the token.
3. Check for malformed or tampered tokens.

<details>
<summary>How to: Verify Function Implementation</summary>

```javascript
// Simulate jwt.verify()
function jwtVerify(token, secret) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    return { valid: false, error: "Malformed token" };
  }

  // Decode header and payload
  const header = JSON.parse(base64UrlDecode(encodedHeader));
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  // Recreate signature
  const validSignature = hash(payload, secret, header);

  // Compare signatures
  if (validSignature !== signature) {
    return { valid: false, error: "Invalid signature" };
  }

  return { valid: true, payload: payload };
}

// Example Usage
console.log(jwtVerify(token2, mySecret2)); // Should return: { valid: true, payload: { userId: 123, userName: "Matti" } }
```
</details>


---

### **Step 7: Example Usage**

```javascript
// Example Usage
const header = { alg: "HS256", typ: "JWT" }; // Customizable
const payload = {
  userId: 123,
  userName: "Matti",
}; 
const secret = require("crypto").randomBytes(64).toString("hex");

console.log("Generated Secret:", secret);
const token = jwtSign(payload, secret, header);
console.log("JWT:", token);

console.log(jwtVerify(token, secret)); // Should print: { valid: true, payload: { userId: 123, userName: "Matti" } }
```
---

### **Step 8: Recap**

1. **Discuss**:
   - **How does each JWT part contribute to its functionality?**
     - Header: Specifies algorithm and token type.
     - Payload: Holds user-specific data.
     - Signature: Ensures the token hasn’t been tampered with.
   - **Why is hashing necessary?**
   - **What happens if the secret is leaked?**
     - If the secret is known, an attacker can create valid-looking tokens.
   - **Difference Between `jwt.verify` and `jwt.decode`:**
     - `jwt.decode` only extracts the payload without validating the token.
     - `jwt.verify` checks the token’s integrity and validates the signature.

2. **Note**:
   While building JWT from scratch is a great learning exercise, in production, always use libraries like `jsonwebtoken`:
   ```bash
   npm install jsonwebtoken
   ```
   Example:
   ```javascript
   const jwt = require("jsonwebtoken");

   const token = jwt.sign(payload, secret, { expiresIn: "1h" });
   const decoded = jwt.verify(token, secret);
   console.log(decoded);
   ```

2. **Test Cases**:
   - Valid tokens.
   - Tampered tokens (modify the payload and test).
   - Tokens with altered headers.

---

### **Key Takeaways**

1. JWTs are a compact and secure way to transfer information.
2. Encoding, hashing, and strong secrets are essential for security.
3. While implementing from scratch is educational, production use should rely on well-tested libraries like `jsonwebtoken`.

