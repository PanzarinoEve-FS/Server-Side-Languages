// Express application: sets up middleware and connects the routes.
// server.js imports this app and starts the server.
const express = require('express');
const app = express();
const userRoutes = require('./routes');
const bookRoutes = require('./routes/books');

// Parse JSON request bodies into req.body, which POST and PUT need.
app.use(express.json());

// localhost:3000 reports that the service is running.
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Service is up",
        metadata: {
            method: req.method,
            hostname: req.hostname,
        }
    });
});



// Context name: every user route lives under localhost:3000/users.
app.use('/users', userRoutes);
// Context name: every book route lives under localhost:3000/books.
app.use('/books', bookRoutes);

module.exports = app;
