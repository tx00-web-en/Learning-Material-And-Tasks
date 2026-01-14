
# Exam (Backend))

**Date:** Jan 14, 2026  
**Topic:** Node.js + Express + MongoDB (Mongoose) + MVC Pattern + Postman + Gemini API endpoint  
**Server Port:** `4003`

## Rules
- **No vibe coding** (no blind copy/paste). Every student is expected to **review and understand** every line they submit.
- You may use your class notes and your previous session repos.
- If you use AI for help, you must be able to explain your code. Unexplained code = no credit.

## Goal
Build a REST API using **Express + Mongoose** following the **MVC pattern** exactly as we practiced in class.

You will implement:
1) A **User** model + CRUD endpoints
2) A **Car** model + CRUD endpoints
3) An **AI endpoint** that calls **Gemini** and accepts/returns **JSON in a structured format** (same idea as our in-class demo)
4) Full Postman testing + export results to JSON

---

## Project Setup Requirements

### Must use
- Node.js + Express
- MongoDB + Mongoose
- `dotenv`
- `cors`
- `morgan` (optional but recommended)

### Must NOT use
- React
- Any ORM other than Mongoose
- A single-file “everything in server.js” structure

---

## Required Folder Structure (MVC)
Your structure must match the **same approach we used in class** (routes → controller → model; plus server + config).

Example (you may add other folders if you need):

```
src/
	config/
		db.js
	models/
		User.js
		Car.js
	controllers/
		userController.js
		carController.js
		aiController.js
	routes/
		userRoutes.js
		carRoutes.js
		aiRoutes.js   (optional) OR add the AI route inside one of the two routers
	middlewares/
		errorHandler.js
		notFound.js
	app.js
server.js
.env
package.json
```

### Server requirements
- Must start with: `npm run dev` (or `npm start` if that’s what we used in class)
- Must run on: `http://localhost:4003`
- Must connect to MongoDB using `MONGODB_URI` in `.env`

---

## Models (Mongoose)

### 1) User Model (`User`)
Create a `User` schema with at least:
- `name` (String, required, min length 2)
- `email` (String, required, unique, lowercase, trimmed)
- `age` (Number, required, min 16)
- `role` (String, enum: `"student" | "admin"`, default: `"student"`)
- timestamps enabled

Validation is required. Return meaningful errors.

### 2) Car Model (`Car`)
Create a `Car` schema with at least:
- `brand` (String, required)
- `model` (String, required)
- `year` (Number, required, min 1990, max current year + 1)
- `price` (Number, required, min 0)
- `isAvailable` (Boolean, default true)
- `owner` (ObjectId ref `User`, optional)
- timestamps enabled

---

## Routers (2 main routers)
You must have exactly **two main routers**:
1) **Users router**
2) **Cars router**

Example mount paths:
- `/api/users`
- `/api/cars`

> You may add an AI route file, but the project must still clearly have the two main routers above.

---

## Required Endpoints

### Users Endpoints (`/api/users`)
Implement all endpoints below:

1) `POST /api/users`
- Creates a user
- Returns: created user JSON

2) `GET /api/users`
- Returns list of users
- Add optional query support (at least one):
	- `?role=student` OR `?minAge=18`

3) `GET /api/users/:id`
- Returns one user by id

4) `PATCH /api/users/:id`
- Updates allowed fields only (name, age, role)
- Email should not be updated (or if you allow it, justify and validate)

5) `DELETE /api/users/:id`
- Deletes the user

### Cars Endpoints (`/api/cars`)
Implement all endpoints below:

1) `POST /api/cars`
- Creates a car

2) `GET /api/cars`
- Returns list of cars
- Add optional query support (choose at least one):
	- `?brand=Toyota`
	- `?minYear=2015`
	- `?available=true`

3) `GET /api/cars/:id`
- Returns one car

4) `PATCH /api/cars/:id`
- Updates allowed fields (brand, model, year, price, isAvailable, owner)

5) `DELETE /api/cars/:id`
- Deletes the car

---

## AI Requirement (Gemini Endpoint)

Add **one endpoint** that calls **Gemini** using the **same pattern as the in-class demo**.

### Endpoint spec
- Method: `POST`
- Path (choose one):
	- `/api/users/ai` OR `/api/cars/ai` OR `/api/ai/gemini`

### Input (JSON request)
Your endpoint must accept a structured JSON body like:

```json
{
	"task": "summarize" ,
	"data": {
		"text": "...",
		"language": "en"
	}
}
```

You may define your own structure, but it must be:
- JSON only
- validated (reject missing fields with `400`)
- consistent (same keys always)

### Output (JSON response)
Must return a structured JSON response, for example:

```json
{
	"success": true,
	"input": { "task": "summarize" },
	"result": {
		"text": "...",
		"meta": { "model": "gemini-..." }
	}
}
```

### Gemini requirements
- API key must come from `.env` (example: `GEMINI_API_KEY`)
- Do not hardcode keys
- Must handle Gemini errors and return:
	- `502` for upstream/AI failure
	- readable message + safe error details

---

## Error Handling (Required)
Implement:
- `notFound` middleware (returns `404` JSON)
- centralized `errorHandler` middleware
- consistent error response format, e.g.:

```json
{
	"success": false,
	"error": {
		"message": "Validation failed",
		"details": []
	}
}
```

Also handle invalid Mongo ObjectId (`CastError`) with `400`.

---

## Postman Requirement
You must:
1) Test **every endpoint** (Users + Cars + AI)
2) Use environment variables in Postman (baseUrl, etc.)
3) Export:
	 - The Postman **collection** as JSON
	 - The Postman **environment** as JSON

Name them clearly, for example:
- `backend-exam-collection.json`
- `backend-exam-environment.json`

Place them in a folder in your repo:
```
postman/
	backend-exam-collection.json
	backend-exam-environment.json
```

---

## Submission
Submit a GitHub repository link containing:
- Working code with the required structure
- `.env.example` (NOT your real `.env`) containing:
	- `MONGODB_URI=`
	- `PORT=4003`
	- `GEMINI_API_KEY=`
- `README.md` that explains:
	- how to install (`npm i`)
	- how to run (`npm run dev`)
	- endpoints list
	- how to import Postman collection/environment

---

## Grading (Rubric)
- MVC structure + clean routing/controller/model separation (20%)
- User endpoints + validation + status codes (20%)
- Car endpoints + validation + relations (owner) (20%)
- Gemini endpoint (JSON in/out + error handling + env key) (20%)
- Postman testing + correct JSON export (10%)
- Code quality + readability + students can explain their code (10%)

---

## Notes
- Use correct HTTP status codes: `201`, `200`, `400`, `404`, `500`, `502`.
- Keep responses in JSON only.
- Keep controllers thin: no DB logic inside routes.

