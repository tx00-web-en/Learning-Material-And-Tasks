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

## Code Explanation

In OpenAPI / Swagger, the **`components`** section acts as a central **data dictionary**. Instead of writing out the structure of a "Todo" item repeatedly across every endpoint (GET, POST, PUT, PATCH), you define it once under `components.schemas` and reference it elsewhere using `$ref: "#/components/schemas/..."`.



### Why Are There Three Different Schemas?

Even though they all represent a "Todo", APIs treat data differently depending on whether it is being **read**, **created**, or **partially updated**:

| Schema | Purpose | Where It Is Used | Key Characteristic |
| :--- | :--- | :--- | :--- |
| **`Todo`** | The full response model | `GET` (returns a todo) and responses from `POST`/`PUT`/`PATCH` | Includes server-generated `id`. All fields are required. |
| **`TodoInput`** | Full request body | `POST` (create) and `PUT` (replace) | Does **not** include `id` (the server generates it). |
| **`TodoPatchInput`** | Partial request body | `PATCH` (update specific fields) | **No required fields**. Clients can send just what they want to change. |


### Detailed Breakdown of Each Schema

#### 1. `Todo` (The Complete Object)
```json
"Todo": {
  "type": "object",
  "required": ["userId", "id", "title", "completed"],
  "properties": { ... }
}
```
* **Role:** Represents the data as stored and returned by the server.
* **Why `id` is included:** When reading from the database/API (`GET /todos/1`), the item always has an ID.
* **`required`:** Lists all four fields because a complete Todo returned by JSONPlaceholder will always contain all of them.


#### 2. `TodoInput` (Payload for Creating / Replacing)
```json
"TodoInput": {
  "type": "object",
  "required": ["userId", "title", "completed"],
  "properties": { ... }
}
```
* **Role:** Used in the request body when a client creates a new item (`POST /todos`) or replaces an existing one (`PUT /todos/{id}`).
* **Why `id` is omitted:** Clients typically do not specify the primary key when creating a resource; the backend database generates it automatically.
* **`required`:** Enforces that a client must supply `userId`, `title`, and `completed` for the request to be valid.


#### 3. `TodoPatchInput` (Payload for Partial Updates)
```json
"TodoPatchInput": {
  "type": "object",
  "properties": { ... }
}
```
* **Role:** Used for `PATCH /todos/{id}`.
* **Why there is no `required` list:** A `PATCH` request only updates the fields sent by the client. For example, if a user marks a task done, they only need to send:
  ```json
  { "completed": true }
  ```
  They don't need to re-send the `title` or `userId`.


### Meaning of the Internal Keywords

* **`type`**: The JSON data type (`object`, `string`, `integer`, `boolean`).
* **`properties`**: The dictionary of keys that can exist inside the object.
* **`required`**: An array of property names that **must** be present in the JSON payload.
* **`example`**: Sample values used by documentation tools (like Swagger UI) to populate mock data or interactive test forms.