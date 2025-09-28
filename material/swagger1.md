Here’s a **Swagger/OpenAPI JSON document** for the described API where all routes are protected by authentication.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Users and Jobs API",
    "description": "API for managing users and job listings.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:4000/api"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "User": {
        "type": "object",
        "required": ["name", "email", "password", "phone_number", "gender", "date_of_birth", "membership_status"],
        "properties": {
          "name": { "type": "string" },
          "email": { "type": "string", "format": "email" },
          "password": { "type": "string", "format": "password" },
          "phone_number": { "type": "string" },
          "gender": { "type": "string" },
          "date_of_birth": { "type": "string", "format": "date" },
          "membership_status": { "type": "string" }
        }
      },
      "Job": {
        "type": "object",
        "required": ["title", "type", "description", "company"],
        "properties": {
          "title": { "type": "string" },
          "type": { "type": "string" },
          "description": { "type": "string" },
          "company": {
            "type": "object",
            "required": ["name", "contactEmail", "contactPhone"],
            "properties": {
              "name": { "type": "string" },
              "contactEmail": { "type": "string", "format": "email" },
              "contactPhone": { "type": "string" }
            }
          }
        }
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/users/signup": {
      "post": {
        "summary": "Sign up a new user",
        "description": "Registers a new user and returns a JWT token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/User" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": { "type": "string" },
                    "token": { "type": "string" }
                  }
                }
              }
            }
          },
          "400": { "description": "Invalid user data." }
        }
      }
    },
    "/users/login": {
      "post": {
        "summary": "Login a user",
        "description": "Validates user credentials and returns a JWT token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["email", "password"],
                "properties": {
                  "email": { "type": "string", "format": "email" },
                  "password": { "type": "string", "format": "password" }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login successful.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": { "type": "string" },
                    "token": { "type": "string" }
                  }
                }
              }
            }
          },
          "400": { "description": "Invalid credentials." }
        }
      }
    },
    "/tours": {
      "get": {
        "summary": "Get all jobs",
        "description": "Returns a list of all jobs.",
        "responses": {
          "200": {
            "description": "List of jobs.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Job" }
                }
              }
            }
          },
          "500": { "description": "Server error." }
        }
      },
      "post": {
        "summary": "Create a job",
        "description": "Creates a new job.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Job" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Job created successfully.",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Job" }
              }
            }
          },
          "400": { "description": "Invalid input." }
        }
      }
    },
    "/tours/{jobId}": {
      "get": {
        "summary": "Get a job by ID",
        "description": "Fetches details of a specific job.",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Job details.",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Job" }
              }
            }
          },
          "404": { "description": "Job not found." }
        }
      },
      "put": {
        "summary": "Update a job",
        "description": "Updates a specific job by ID.",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Job" }
            }
          }
        },
        "responses": {
          "200": { "description": "Job updated successfully." },
          "404": { "description": "Job not found." }
        }
      },
      "delete": {
        "summary": "Delete a job",
        "description": "Deletes a specific job by ID.",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "204": { "description": "Job deleted successfully." },
          "404": { "description": "Job not found." }
        }
      }
    }
  }
}
``` 

This JSON defines all the endpoints, applies JWT-based security to all routes, and aligns with the described models and controllers. Let me know if you need further refinements!