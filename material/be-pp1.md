# (Optional Task) Build JWT from Scratch

### **Objective**

By the end of this lab you should be able to:

1. Understand **why JWT exists** and what problem it solves.  
2. Recognize the **three parts of a JWT** (header, payload, signature).  
3. Write functions to:
   - Encode/decode data using Base64URL.  
   - Hash data to create and verify JWTs.  
   - Simulate `jwt.sign()` to create a token.  
   - Simulate `jwt.verify()` to validate a token.  
4. Put it all together in an end‑to‑end example.  
5. Compare your implementation with the production‑ready `jsonwebtoken` library.

---

### **Step 1: Why JWT?**

- In web apps, once a user logs in, the server needs a way to remember “who they are” on subsequent requests.  
- Traditional sessions store this on the server, but that doesn’t scale well.  
- JWTs solve this by letting the server issue a **self‑contained token** that the client sends back with each request.  
- The token contains user data (payload) and a signature that proves it hasn’t been tampered with.

Think of it like a **sealed envelope**:  
- The header and payload are written on the paper inside (visible to anyone).  
- The signature is the wax seal — if it’s broken or forged, the server knows not to trust it.

---

### **Step 2: JWT Structure**

A JWT has three parts separated by dots:

```
header.payload.signature
```

- **Header**: Metadata (algorithm, type).  
- **Payload**: Claims (user info, expiry time, etc.).  
- **Signature**: A hash of header + payload + secret.  

Example JWT:

```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJfaWQiOiI2Mzc5ZjY3NzhlMTg3NDA2YjY0Mzk2YjciLCJpYXQiOjE2Njg5MzczMzYsImV4cCI6MTY2OTE5NjUzNn0.
dWq1GPvujtGp168vSu3z_dtZBNd_ohl0HNi1vylqjT8
```

ASCII diagram:

```
+--------+---------+--------------------------------+
| Header | Payload | Signature                      |
+--------+---------+--------------------------------+
```

---

### **Step 3: Project Setup**

1. Create a file named `jwt.js`.  
2. Use Node.js’s built‑in `crypto` module (no npm install needed).  
   - No `node_modules` or `.env` required for this exercise.

---

### **Step 4: Encoding and Decoding**

We need to encode the header and payload into Base64URL.

- **Encoding**: Converts binary → text.  
- **Decoding**: Converts text → binary.  
- **Important**: Encoding/decoding is **not encryption**. It does not provide privacy, only a safe way to represent data. Anyone can decode it.

```js
// Simple Base64 Encode/Decode (not URL-safe)
// Good for understanding the concept, but not robust for JWT
function base64Encode(data) {
  return Buffer.from(data).toString("base64");
}

function base64Decode(base64) {
  return Buffer.from(base64, "base64").toString();
}

// Test
console.log(base64Encode("hello")); // aGVsbG8=
console.log(base64Decode("aGVsbG8=")); // hello
```

**Explanation:**  
- The simple version shows that encoding is reversible.  

1. `base64Encode(data)`  
   - **What it does:** Converts normal text (like `"hello"`) into **Base64** format.  
   - **How it works:**  
     - `Buffer.from(data)` → turns the string into raw binary data.  
     - `.toString("base64")` → converts that binary into Base64 text.  
   - **Example:**  
     ```js
     base64Encode("hello"); // "aGVsbG8="
     ```
   - **Note:** The `=` at the end is **padding** to make the length a multiple of 4.

2. `base64Decode(base64)`  
   - **What it does:** Converts Base64 text back into normal text.  
   - **How it works:**  
     - `Buffer.from(base64, "base64")` → reads the Base64 string as binary.  
     - `.toString()` → converts it back into readable text.  
   - **Example:**  
     ```js
     base64Decode("aGVsbG8="); // "hello"
     ```

---

**Better Implementation (Base64URL for JWT)**

```javascript
// Encode to Base64URL
function base64UrlEncode(data) {
  return Buffer.from(data)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Decode from Base64URL
function base64UrlDecode(encodedData) {
  const base64 = encodedData.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString();
}

console.log(base64UrlEncode("hello")); // aGVsbG8
console.log(base64UrlDecode("aGVsbG8")); // hello
```

**Explanation:**  
- The Base64URL version is required for JWTs because `+`, `/`, and `=` can break URLs or headers.  

1. `base64UrlEncode(data)`  
   - **Why we need it:** Standard Base64 isn’t safe for URLs or JWTs because:  
     - `+` and `/` are special characters in URLs.  
     - `=` padding can cause issues.  
   - **How it works:**  
     - First, encode to normal Base64.  
     - Then:  
       - `.replace(/=/g, "")` → remove padding.  
       - `.replace(/\+/g, "-")` → replace `+` with `-`.  
       - `.replace(/\//g, "_")` → replace `/` with `_`.  
   - **Example:**  
     ```js
     base64UrlEncode("hello"); // "aGVsbG8"
     ```

2. `base64UrlDecode(encodedData)`  
   - **What it does:** Converts Base64URL back into normal text.  
   - **How it works:**  
     - Replace URL-safe characters back:  
       - `-` → `+`  
       - `_` → `/`  
     - Decode using normal Base64.  
   - **Example:**  
     ```js
     base64UrlDecode("aGVsbG8"); // "hello"
     ```

---


### **Step 5: Hashing**

The signature is created by hashing the header + payload with a secret.

- Hashing is a **one‑way function**: you cannot reverse it.  
- We use HMAC‑SHA256 here.  

<details>
<summary>Implementation</summary>

```javascript
const crypto = require("crypto");

function hash(payload, secret, header) {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("hex");
}

// Test
const header1 = { alg: "HS256", typ: "JWT" }; // Customizable
const payload1 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
const secret1 = "my-secret-key";

console.log("Hash:", hash(payload1, secret1, header1));
```

**Explanation:**  

1. `const crypto = require("crypto");`  
   - Loads Node.js’s built-in **crypto** module.  
   - This module provides cryptographic functions like hashing, encryption, and HMAC.  

2. `JSON.stringify(header)` and `JSON.stringify(payload)`  
   - JWTs are made of three parts: **header**, **payload**, and **signature**.  
   - The header and payload are **JSON objects**, but they must be turned into strings before encoding.  

   Example:  
   ```js
   const header = { alg: "HS256", typ: "JWT" };
   const payload = { user: "Alice", role: "admin" };

   JSON.stringify(header);  // '{"alg":"HS256","typ":"JWT"}'
   JSON.stringify(payload); // '{"user":"Alice","role":"admin"}'
   ```

3. `base64UrlEncode(...)`  
   - Converts the JSON strings into **Base64URL** format (safe for URLs and JWTs).  
   - Example:  
     ```js
     encodedHeader  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
     encodedPayload = "eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ"
     ```

4. `crypto.createHmac("sha256", secret)`  
   - Creates an **HMAC (Hash-based Message Authentication Code)** using:  
     - Algorithm: `sha256`  
     - Secret key: `secret` (shared between server and client)  
   - This ensures the token can’t be tampered with, because only someone with the secret can generate the same signature.  

5. `.update(`${encodedHeader}.${encodedPayload}`)`  
   - The **data being signed** is:  
     ```
     encodedHeader + "." + encodedPayload
     ```
   - Example:  
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ
     ```

6. `.digest("hex")`  
   - Produces the final **signature** as a hexadecimal string.  
   - Example output:  
     ```
     5d41402abc4b2a76b9719d911017c592
     ```

</details>

---

### **Step 6: Simulate `jwt.sign()`**

Steps:  
1. Encode header and payload.  
2. Hash them with the secret.  
3. Concatenate into `header.payload.signature`.

<details>
<summary>Implementation</summary>

```javascript
function jwtSign(payload, secret, header = { alg: "HS256", typ: "JWT" }) {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = hash(payload, secret, header);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Example Usage
const payload2 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Expires in 60 seconds
const mySecret2 = require("crypto").randomBytes(64).toString("hex"); // Strong secret
const header2 = { alg: "HS256", typ: "JWT" }; // Customizable

console.log("Generated Secret:", mySecret2);
const token2 = jwtSign(payload2, mySecret2, header2);
console.log("JWT:", token2);
```

**Explanation:**  

1. **Default Header**  
   ```js
   header = { alg: "HS256", typ: "JWT" }
   ```
   - If no header is passed, it defaults to:  
     - `alg: "HS256"` → algorithm is HMAC-SHA256.  
     - `typ: "JWT"` → type is JWT.  
   - This is the **standard JWT header**.  

2. **Encode the Header**  
   ```js
   const encodedHeader = base64UrlEncode(JSON.stringify(header));
   ```
   - Converts the header object into a JSON string, then Base64URL-encodes it.  
   - Example:  
     ```js
     '{"alg":"HS256","typ":"JWT"}'
     → "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
     ```

3. **Encode the Payload**  
   ```js
   const encodedPayload = base64UrlEncode(JSON.stringify(payload));
   ```
   - Same process for the payload (the data you want inside the token).  
   - Example payload:  
     ```js
     { user: "Alice", role: "admin" }
     ```
     Encoded:  
     ```
     eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ
     ```

4. **Create the Signature**  
   ```js
   const signature = hash(payload, secret, header);
   ```
   - Uses the earlier `hash` function:  
     - Takes the encoded header and payload.  
     - Signs them with the secret key using HMAC-SHA256.  
   - Produces a **signature** that ensures integrity (if someone tampers with the payload, the signature won’t match).  

5. **Return the Full JWT**  
   ```js
   return `${encodedHeader}.${encodedPayload}.${signature}`;
   ```
   - Joins the three parts with dots:  
     ```
     header.payload.signature
     ```

**Example JWT**  

If we call:  
```js
jwtSign({ user: "Alice", role: "admin" }, "my-secret");
```

We might get something like:  
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VyIjoiQWxpY2UiLCJyb2xlIjoiYWRtaW4ifQ
.
5d41402abc4b2a76b9719d911017c592
```

</details>


---

### **Step 7: Simulate `jwt.verify()`**

Steps:  
1. Split the token into parts.  
2. Decode header and payload.  
3. Recreate the signature.  
4. Compare with the token’s signature.  

<details>
<summary>Implementation</summary>

```javascript
function jwtVerify(token, secret) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) {
    return { valid: false, error: "Malformed token" };
  }
  const header = JSON.parse(base64UrlDecode(encodedHeader));
  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  const validSignature = hash(payload, secret, header);
  if (validSignature !== signature) {
    return { valid: false, error: "Invalid signature" };
  }
  return { valid: true, payload };
}

// Example Usage
console.log(jwtVerify(token2, mySecret2));
// Should return: { valid: true, payload: { userId: 123, userName: "Matti" } }
```

**Explanation:**  

1. **Split the Token**  
   ```js
   const [encodedHeader, encodedPayload, signature] = token.split(".");
   ```
   - A JWT has **three parts** separated by dots:  
     ```
     header.payload.signature
     ```
   - This line splits the token into those three parts.  

2. **Check for Malformed Token**  
   ```js
   if (!encodedHeader || !encodedPayload || !signature) {
     return { valid: false, error: "Malformed token" };
   }
   ```
   - If any part is missing, the token isn’t a proper JWT.  
   - Returns an error immediately.  

3. **Decode Header and Payload**  
   ```js
   const header = JSON.parse(base64UrlDecode(encodedHeader));
   const payload = JSON.parse(base64UrlDecode(encodedPayload));
   ```
   - Base64URL-decoding turns the encoded strings back into JSON text.  
   - `JSON.parse` converts that text into JavaScript objects.  
   - Now we have the original header and payload.  

4. **Recompute the Signature**  
   ```js
   const validSignature = hash(payload, secret, header);
   ```
   - Uses the same `hash` function from before.  
   - Recreates what the signature **should** be, based on:  
     - The decoded header  
     - The decoded payload  
     - The secret key  

5. **Compare Signatures**  
   ```js
   if (validSignature !== signature) {
     return { valid: false, error: "Invalid signature" };
   }
   ```
   - If the recomputed signature doesn’t match the one in the token:  
     - Someone may have tampered with the payload.  
     - Or the wrong secret was used.  
   - In that case, the token is **invalid**.  

6. **Return Success**  
   ```js
   return { valid: true, payload };
   ```
   - If everything checks out:  
     - The token is valid.  
     - The function returns the decoded payload (the useful data inside the JWT).  

7. **Example Flow**  
   ```js
   const token = jwtSign({ user: "Alice" }, "my-secret");
   jwtVerify(token, "my-secret");
   ```

   ✅ Output:  
   ```js
   { valid: true, payload: { user: "Alice" } }
   ```

   ❌ If someone changes the payload (e.g., `"user": "Bob"`) but doesn’t know the secret:  
   ```js
   { valid: false, error: "Invalid signature" }
   ```

</details>

---

### **Step 8: End‑to‑End Example**

```javascript
const header = { alg: "HS256", typ: "JWT" };
const payload = { userId: 123, userName: "Matti" };
const secret = "my-secret-key";

const token = jwtSign(payload, secret, header);
console.log("JWT:", token);

console.log(jwtVerify(token, secret));
// { valid: true, payload: { userId: 123, userName: "Matti" } }
```

Try tampering with the payload string and see verification fail.

---

### **Step 9: Using `jsonwebtoken`**

In real projects, always use a library:

```bash
npm install jsonwebtoken
```

```javascript
const jwt = require("jsonwebtoken");

const newToken = jwt.sign(payload, secret, { expiresIn: "1h" });
const decoded = jwt.verify(newToken, secret);
console.log(decoded);
```

---

### **Step 10: Recap**

- **Why JWT**: Stateless authentication, scalable.  
- **Parts**: Header, Payload, Signature.  
- **Encoding/Decoding**: Just representation, not security.  
- **Hashing**: One‑way, ensures integrity.  
- **Sign/Verify**: Create and validate tokens.  
- **Production**: Use `jsonwebtoken`.  

---

### **Key Takeaways**

1. JWTs are a compact way to securely transmit information.  
2. Encoding/decoding is not robust security — it’s just a proof of concept here.  
3. The real protection comes from hashing with a secret.  
4. Always use well‑tested libraries in production.  






<!-- # Build JWT from Scratch (Version 1)
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
 -->
