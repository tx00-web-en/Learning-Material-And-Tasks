```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "JSONPlaceholder Todos API",
    "description": "OpenAPI specification for the `/todos` resource provided by JSONPlaceholder.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://jsonplaceholder.typicode.com",
      "description": "Production Server"
    }
  ],
  "paths": {
    "/todos": {
      "get": {
        "summary": "List all todos",
        "description": "Retrieves a list of todo items. Supports optional filtering by `userId` or `completed` status.",
        "operationId": "getTodos",
        "parameters": [
          {
            "name": "userId",
            "in": "query",
            "description": "Filter todos by User ID",
            "required": false,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "completed",
            "in": "query",
            "description": "Filter todos by completion status",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A successful list of todos.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Todo"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new todo",
        "description": "Creates a new todo item.",
        "operationId": "createTodo",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TodoInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Todo successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          }
        }
      }
    },
    "/todos/{id}": {
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "The unique identifier of the todo item",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "get": {
        "summary": "Get a todo by ID",
        "description": "Returns a single todo item by its ID.",
        "operationId": "getTodoById",
        "responses": {
          "200": {
            "description": "Todo found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "404": {
            "description": "Todo not found."
          }
        }
      },
      "put": {
        "summary": "Replace a todo",
        "description": "Updates an existing todo item by replacing its entire payload.",
        "operationId": "updateTodo",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TodoInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Todo updated successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "404": {
            "description": "Todo not found."
          }
        }
      },
      "patch": {
        "summary": "Partially update a todo",
        "description": "Updates one or more fields of an existing todo item.",
        "operationId": "patchTodo",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TodoPatchInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Todo patched successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "404": {
            "description": "Todo not found."
          }
        }
      },
      "delete": {
        "summary": "Delete a todo",
        "description": "Deletes a todo item by ID.",
        "operationId": "deleteTodo",
        "responses": {
          "200": {
            "description": "Todo deleted successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "404": {
            "description": "Todo not found."
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Todo": {
        "type": "object",
        "required": ["userId", "id", "title", "completed"],
        "properties": {
          "userId": {
            "type": "integer",
            "example": 1
          },
          "id": {
            "type": "integer",
            "example": 1
          },
          "title": {
            "type": "string",
            "example": "delectus aut autem"
          },
          "completed": {
            "type": "boolean",
            "example": false
          }
        }
      },
      "TodoInput": {
        "type": "object",
        "required": ["userId", "title", "completed"],
        "properties": {
          "userId": {
            "type": "integer",
            "example": 1
          },
          "title": {
            "type": "string",
            "example": "delectus aut autem"
          },
          "completed": {
            "type": "boolean",
            "example": false
          }
        }
      },
      "TodoPatchInput": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "integer",
            "example": 1
          },
          "title": {
            "type": "string",
            "example": "updated title"
          },
          "completed": {
            "type": "boolean",
            "example": true
          }
        }
      }
    }
  }
}
```