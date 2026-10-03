const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Get - root",
        metadata: {
            method: req.method,
            hostname: req.hostname,
        }
    });
});

app.use('/api', routes);

module.exports = app;