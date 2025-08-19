# The `req` Object in Express.js

## Introduction

The `req` object, short for "request," is a crucial part of the request and response cycle in Express.js. It allows you to examine incoming requests from clients, make HTTP requests, and handle incoming data, whether in string or JSON format.

In this tutorial, we'll explore the various aspects of the `req` object in Express.js.

## Prerequisites

To follow along with this tutorial, you should have:

- A basic understanding of Node.js.
- Familiarity with HTTP requests.

## Managing Client-Side Data

Express servers receive data from clients through three main objects on the `req` object: `req.params`, `req.query`, and `req.body`.

### `req.params`

The `req.params` object captures data based on parameters specified in the URL. For example:

```javascript
app.get('/api/:userid', (req, res) => {
  console.log(req.params.userid); 
});
```

### `req.query`

The `req.query` object allows you to access data from the URL query string. For instance:

```javascript
app.get('/search', (req, res) => {
  console.log(req.query.keyword); 
});
```

- When a client sends a request to `/search?keyword=JavaScript`, the value `JavaScript` is captured in `req.query.keyword`.

### `req.body`

The `req.body` object is used to access data sent from clients in the body of POST or PUT requests. Example:

```javascript
app.post('/login', (req, res) => {
  console.log(req.body.email); 
  console.log(req.body.password); 
});
```

## Examining URL Properties

The `req` object also provides access to various parts of the URL, such as the protocol, hostname, and path.

```javascript
app.get('/creatures', (req, res) => {
  console.log(req.protocol); // Output: "https"
  console.log(req.hostname); // Output: "example.com"
  console.log(req.path); // Output: "/creatures"
  console.log(req.originalUrl); // Output: "/creatures?filter=sharks"
});
```

## Additional `req` Properties

You can access additional properties on the `req` object, such as the HTTP method and request headers.

```javascript
app.delete('/', (req, res) => {
  console.log(req.method); // Output: "DELETE"
});

app.post('/login', (req, res) => {
  console.log(req.header('Content-Type')); // Output: "application/json"
  console.log(req.header('user-agent')); // Output: "Mozilla/5.0 (Macintosh Intel Mac OS X 10_8_5) AppleWebKi..."
  console.log(req.header('Authorization')); // Output: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
});
```

## Conclusion

Understanding the `req` object in Express.js is essential for handling HTTP requests and managing client-side data effectively. For more information, refer to the [official Express.js documentation](https://expressjs.com/en/api.html#req).

## Ref
- https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs
- https://htmlmarkdown.com/