// index.js
const config = require('./config');

console.log("Database URI: ", config.MONGO_URI);
console.log("Environment: ", config.NODE_ENV);
console.log("Running on port: ", config.PORT);