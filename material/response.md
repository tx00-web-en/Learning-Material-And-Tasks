# The `res` Object in Express.js

## Introduction

In Express.js, the `res` object, short for "response," is used to send responses back to clients making HTTP requests to your server. It allows you to send various types of responses, including plain text, JSON data, and status codes.

In this tutorial, we'll explore how to use the `res` object in Express.js to send responses to clients.

## Sending Plain Text

You can use the `res.send()` method to send plain text responses to clients. For example:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

In this example, when a client makes a GET request to the root URL ('/'), the server responds with the text "Hello World!".

## Setting Status Codes

The `res.status()` method allows you to set the HTTP status code of the response. This method is often used to indicate the success or failure of a request. For example:

```javascript
app.get('/success', (req, res) => {
  res.status(200).send('Success');
});

app.get('/not-found', (req, res) => {
  res.status(404).send('Not Found');
});
```

In these examples, the server responds with status code 200 ("Success") for requests to '/success', and status code 404 ("Not Found") for requests to '/not-found'.

## Sending JSON Data

You can use the `res.json()` method to send JSON data as a response to clients. For example:

```javascript
app.get('/api/data', (req, res) => {
  res.json({ message: "some message" });
});
```

In this example, when a client makes a GET request to '/api/data', the server responds with JSON data containing the message "some message".

You can also use the `res.status()` method to set the HTTP status code of the response and then use the `res.json()` method to send JSON data. For example:

```javascript
app.get('/api/data', (req, res) => {
  res.status(200).json({ message: "Success" });
});
```

In the example above, when a client makes a GET request to '/api/data', the server responds with a status code of 200 ("Success") along with JSON data containing the message "Success".

## Conclusion

The `res` object in Express.js provides methods for sending responses back to clients, including sending plain text, setting status codes, and sending JSON data. By utilizing these methods effectively, you can build robust and efficient web applications with Express.js.

## Ref

- https://htmlmarkdown.com/
- https://www.digitalocean.com/community/tutorials/nodejs-res-object-in-expressjs



