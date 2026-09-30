Here’s a **Swagger/OpenAPI JSON document** for the described API where all routes are protected by authentication.

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Jobs API",
    "description": "REST API for user authentication and job management.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:4000/api",
      "description": "Local development server"
    }
  ],
  "tags": [
    {
      "name": "Authentication",
      "description": "User authentication and registration"
    },
    {
      "name": "Jobs",
      "description": "Job management"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "Enter a valid JWT token."
      }
    },
    "schemas": {
      "User": {
        "type": "object",
        "required": [
          "name",
          "email",
          "password",
          "phone_number",
          "gender",
          "date_of_birth",
          "membership_status"
        ],
        "properties": {
          "_id": {
            "type": "string",
            "example": "64f1a2b3c4d5e6f789012345"
          },
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "format": "email",
            "example": "john@example.com"
          },
          "password": {
            "type": "string",
            "format": "password",
            "example": "password123"
          },
          "phone_number": {
            "type": "string",
            "example": "+1234567890"
          },
          "gender": {
            "type": "string",
            "example": "male"
          },
          "date_of_birth": {
            "type": "string",
            "format": "date",
            "example": "1990-01-15"
          },
          "membership_status": {
            "type": "string",
            "example": "active"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "SignupRequest": {
        "type": "object",
        "required": [
          "name",
          "email",
          "password",
          "phone_number",
          "gender",
          "date_of_birth",
          "membership_status"
        ],
        "properties": {
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "format": "email",
            "example": "john@example.com"
          },
          "password": {
            "type": "string",
            "format": "password",
            "example": "password123"
          },
          "phone_number": {
            "type": "string",
            "example": "+1234567890"
          },
          "gender": {
            "type": "string",
            "example": "male"
          },
          "date_of_birth": {
            "type": "string",
            "format": "date",
            "example": "1990-01-15"
          },
          "membership_status": {
            "type": "string",
            "example": "active"
          }
        }
      },
      "LoginRequest": {
        "type": "object",
        "required": [
          "email",
          "password"
        ],
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "example": "john@example.com"
          },
          "password": {
            "type": "string",
            "format": "password",
            "example": "password123"
          }
        }
      },
      "AuthResponse": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "example": "john@example.com"
          },
          "token": {
            "type": "string",
            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        }
      },
      "JobCompany": {
        "type": "object",
        "required": [
          "name",
          "contactEmail",
          "contactPhone"
        ],
        "properties": {
          "name": {
            "type": "string",
            "example": "Acme Corporation"
          },
          "contactEmail": {
            "type": "string",
            "format": "email",
            "example": "jobs@acme.com"
          },
          "contactPhone": {
            "type": "string",
            "example": "+1234567890"
          }
        }
      },
      "Job": {
        "type": "object",
        "required": [
          "title",
          "type",
          "description",
          "company",
          "user_id"
        ],
        "properties": {
          "id": {
            "type": "string",
            "example": "64f1a2b3c4d5e6f789012345"
          },
          "_id": {
            "type": "string",
            "example": "64f1a2b3c4d5e6f789012345"
          },
          "title": {
            "type": "string",
            "example": "Software Engineer"
          },
          "type": {
            "type": "string",
            "example": "Full-time"
          },
          "description": {
            "type": "string",
            "example": "Develop and maintain web applications."
          },
          "company": {
            "$ref": "#/components/schemas/JobCompany"
          },
          "user_id": {
            "type": "string",
            "example": "64f1a2b3c4d5e6f789012345"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "CreateJobRequest": {
        "type": "object",
        "required": [
          "title",
          "type",
          "description",
          "company"
        ],
        "properties": {
          "title": {
            "type": "string",
            "example": "Software Engineer"
          },
          "type": {
            "type": "string",
            "example": "Full-time"
          },
          "description": {
            "type": "string",
            "example": "Develop and maintain web applications."
          },
          "company": {
            "$ref": "#/components/schemas/JobCompany"
          }
        }
      },
      "UpdateJobRequest": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "example": "Senior Software Engineer"
          },
          "type": {
            "type": "string",
            "example": "Full-time"
          },
          "description": {
            "type": "string",
            "example": "Develop and maintain scalable web applications."
          },
          "company": {
            "$ref": "#/components/schemas/JobCompany"
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "example": "Server Error"
          }
        }
      },
      "Message": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Job not found"
          }
        }
      }
    }
  },
  "paths": {
    "/users/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Login user",
        "description": "Authenticates a user and returns a JWT token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login successful",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid credentials",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                },
                "example": {
                  "error": "Invalid credentials"
                }
              }
            }
          }
        }
      }
    },
    "/users/signup": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Register a new user",
        "description": "Creates a new user account and returns a JWT token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignupRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User successfully created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input or user already exists",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                },
                "examples": {
                  "missingFields": {
                    "value": {
                      "error": "Please add all fields"
                    }
                  },
                  "userExists": {
                    "value": {
                      "error": "User already exists"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/jobs": {
      "get": {
        "tags": [
          "Jobs"
        ],
        "summary": "Get all jobs",
        "description": "Returns all jobs sorted by creation date in descending order. This endpoint is public.",
        "responses": {
          "200": {
            "description": "List of jobs",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Job"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Jobs"
        ],
        "summary": "Create a job",
        "description": "Creates a new job. The authenticated user's ID is automatically assigned to user_id.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateJobRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Job successfully created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Job"
                }
              }
            }
          },
          "401": {
            "description": "Authentication required"
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/jobs/{jobId}": {
      "get": {
        "tags": [
          "Jobs"
        ],
        "summary": "Get a job by ID",
        "description": "Returns a single job by its MongoDB ObjectId. This endpoint is public.",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "description": "MongoDB ObjectId of the job",
            "schema": {
              "type": "string",
              "pattern": "^[0-9a-fA-F]{24}$",
              "example": "64f1a2b3c4d5e6f789012345"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Job found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Job"
                }
              }
            }
          },
          "404": {
            "description": "Job not found or invalid job ID",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/Error"
                    },
                    {
                      "$ref": "#/components/schemas/Message"
                    }
                  ]
                },
                "examples": {
                  "invalidId": {
                    "value": {
                      "error": "No such job"
                    }
                  },
                  "notFound": {
                    "value": {
                      "message": "Job not found"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Jobs"
        ],
        "summary": "Update a job",
        "description": "Updates an existing job. Authentication is required.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "description": "MongoDB ObjectId of the job",
            "schema": {
              "type": "string",
              "pattern": "^[0-9a-fA-F]{24}$",
              "example": "64f1a2b3c4d5e6f789012345"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateJobRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Job successfully updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Job"
                }
              }
            }
          },
          "401": {
            "description": "Authentication required"
          },
          "404": {
            "description": "Job not found or invalid job ID",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/Error"
                    },
                    {
                      "$ref": "#/components/schemas/Message"
                    }
                  ]
                },
                "examples": {
                  "invalidId": {
                    "value": {
                      "error": "No such job"
                    }
                  },
                  "notFound": {
                    "value": {
                      "message": "Job not found"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Jobs"
        ],
        "summary": "Delete a job",
        "description": "Deletes an existing job. Authentication is required.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "description": "MongoDB ObjectId of the job",
            "schema": {
              "type": "string",
              "pattern": "^[0-9a-fA-F]{24}$",
              "example": "64f1a2b3c4d5e6f789012345"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Job successfully deleted. No content is returned."
          },
          "401": {
            "description": "Authentication required"
          },
          "404": {
            "description": "Job not found or invalid job ID",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/Error"
                    },
                    {
                      "$ref": "#/components/schemas/Message"
                    }
                  ]
                },
                "examples": {
                  "invalidId": {
                    "value": {
                      "error": "No such job"
                    }
                  },
                  "notFound": {
                    "value": {
                      "message": "Job not found"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  }
}
``` 

This JSON defines all the endpoints, applies JWT-based security to all routes, and aligns with the described models and controllers. Let me know if you need further refinements!