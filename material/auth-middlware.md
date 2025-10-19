# Understanding Auth Middleware and Morgan Middleware in Express

### 1. Auth Middleware: `checkAdminRole`

Middleware is a crucial part of Express applications, allowing us to run specific code before requests reach route handlers. In this example, we have an authentication middleware called `checkAdminRole` used in conjunction with a `carRouter` to restrict access based on the user's role.

#### Code Explanation

```javascript
// Middleware to check for admin role
function checkAdminRole(req, res, next) {
  const role = req.query.role;
  
  if (role === "admin") {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).send("Access denied");
  }
}
 
module.exports = checkAdminRole;
```

- **Purpose**: The `checkAdminRole` middleware checks if the user has an "admin" role before allowing them to access certain routes.
- **How It Works**:
  - `req.query.role`: Retrieves the role of the user from the query string of the request URL.
  - `if (role === "admin")`: Checks if the role is "admin".
    - If yes, `next()` is called to pass control to the next middleware or route handler.
    - If not, a `403 Forbidden` status is sent back with the message "Access denied".

#### Testing the Middleware with Postman

To test this middleware using Postman:

1. **Set up the Route**: Ensure your `carRouter` is using this middleware.
   ```javascript
   const express = require('express');
   const carRouter = express.Router();
   const checkAdminRole = require('./middleware/checkAdminRole');

   carRouter.use(checkAdminRole);

   carRouter.get('/cars', (req, res) => {
     res.send('Car list accessed by admin');
   });

   module.exports = carRouter;
   ```

2. **Send a Request in Postman**:
   - **Method**: `GET`
   - **URL**: `http://localhost:4000/cars?role=admin`
   - **Expected Response**: You should receive `"Car list accessed by admin"` as a response.
   - **If Role is Not Admin**:
     - **URL**: `http://localhost:4000/cars?role=user`
     - **Expected Response**: `Access denied` with a `403` status code.

#### What Happens if Role is Passed in the Header?

If the role is passed in the header, the middleware needs to be modified accordingly:

```javascript
function checkAdminRole(req, res, next) {
  const role = req.headers.role; // Fetch role from headers instead of query

  if (role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied");
  }
}
```

- **Explanation**:
  - `req.headers.role` is used to access the role from the request headers.
  - This approach is typically more secure than passing sensitive information in the query string, as headers are not easily visible in URLs or server logs.

#### Testing with Postman When Role is in Headers

To test the modified middleware:

1. **Send a Request in Postman**:
   - **Method**: `GET`
   - **URL**: `http://localhost:4000/cars`
   - **Headers**: Add a custom header `role` with the value `admin`.
   - **Expected Response**: `"Car list accessed by admin"`
   - **If Role is Not Admin**: Change the `role` header value to something other than `admin` and you should receive a `403` status code with `Access denied`.

### 2. Morgan Middleware

Morgan is a middleware for logging HTTP requests in an Express application. It is highly configurable, providing various predefined formats and the ability to define custom formats.

#### How to Use Morgan

1. **Install Morgan**:
   ```bash
   npm install morgan
   ```

2. **Include in Your Express App**:
   ```javascript
   const express = require('express');
   const morgan = require('morgan');
   const app = express();

   app.use(morgan('dev')); // Example of using 'dev' format
   ```

#### Morgan Formats and Use Cases

1. **`dev`**:
   - **Description**: Outputs concise colored logs for development.
   - **Use Case**: Ideal for development environments where you need immediate feedback on requests, such as status codes, response times, and methods.
   ```javascript
   app.use(morgan('dev'));
   ```
   - **Example Output**:
     ```
     GET /cars 200 9.345 ms - 27
     ```

2. **`tiny`**:
   - **Description**: Minimal output logging, consisting of only the basic request details.
   - **Use Case**: Useful for environments where you want minimal log size and only essential details, such as production logs to save space.
   ```javascript
   app.use(morgan('tiny'));
   ```
   - **Example Output**:
     ```
     GET /cars 200 - -
     ```

3. **`short`**:
   - **Description**: Provides a short, non-colored log format with more details than `tiny`.
   - **Use Case**: Good for general logging needs, providing more information than `tiny` but without the verbosity of other formats.
   ```javascript
   app.use(morgan('short'));
   ```
   - **Example Output**:
     ```
     ::1 - GET /cars HTTP/1.1 200 - 9.345 ms
     ```

4. **`custom`**:
   - **Description**: Define your own format by combining predefined tokens or creating new ones.
   - **Use Case**: Useful when you need specific information or a format that isn't provided by the default ones.
   ```javascript
   morgan.token('id', function getId(req) {
     return req.id; // Custom token example
   });

   app.use(morgan(':id :method :url :response-time'));
   ```
   - **Example Output**:
     ```
     12345 GET /cars 5.678 ms
     ```

### Conclusion

Middleware plays a crucial role in managing the flow of requests in an Express application. The `checkAdminRole` middleware allows us to restrict access based on user roles, with flexibility to obtain this information from different sources (query parameters or headers). Meanwhile, Morgan provides versatile logging capabilities, essential for debugging, monitoring, and analytics. Understanding and effectively using these tools can greatly enhance the functionality and security of your Express applications.


---

## Links

- [How To Use And Write Express Middleware](https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/)
- [Every Important HTTP Status Code Explained](https://blog.webdevsimplified.com/2022-12/http-status-codes/)