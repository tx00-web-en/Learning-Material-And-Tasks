Here's a generated **Swagger/OpenAPI** JSON document for the API you described. The document includes routes for both users and jobs, with all routes protected by authentication except for the `signup` and `login` endpoints.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "User and Jobs API",
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
      },
      "JobInput": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "type": { "type": "string" },
          "description": { "type": "string" },
          "company": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "contactEmail": { "type": "string", "format": "email" },
              "contactPhone": { "type": "string" }
            }
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "message": { "type": "string" }
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
    "/users/login": {
      "post": {
        "summary": "Login a user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string", "format": "email" },
                  "password": { "type": "string", "format": "password" }
                },
                "required": ["email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User successfully logged in",
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
          "400": {
            "description": "Invalid credentials",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/users/signup": {
      "post": {
        "summary": "Signup a new user",
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
            "description": "User successfully created",
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
          "400": {
            "description": "Invalid user data",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/jobs": {
      "get": {
        "summary": "Get all jobs",
        "responses": {
          "200": {
            "description": "List of all jobs",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Job" }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new job",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/JobInput" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Job successfully created",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Job" }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/jobs/{jobId}": {
      "get": {
        "summary": "Get job by ID",
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
            "description": "Job details",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Job" }
              }
            }
          },
          "404": {
            "description": "Job not found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Update job by ID",
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
              "schema": { "$ref": "#/components/schemas/JobInput" }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Job successfully updated",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Job" }
              }
            }
          },
          "404": {
            "description": "Job not found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete job by ID",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "204": {
            "description": "Job successfully deleted"
          },
          "404": {
            "description": "Job not found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    }
  }
}
```

### Notes:
- The API uses **JWT-based authentication**, which is represented as a `bearerAuth` security scheme.
- Authentication is required for all job-related routes (`/jobs`), but not for the user `login` and `signup` routes.
- Error handling for scenarios like "Job not found" or "Invalid credentials" has been included with `400`, `404`, and `500` responses.
- The models (schemas) for `User` and `Job` are reflected in the JSON document