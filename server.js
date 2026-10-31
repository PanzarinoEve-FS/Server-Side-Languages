// Entry point: starts the HTTP server. Run with `npm run dev` or `npm start`.
const http = require('http');
// Load the variables in .env (like PORT) into process.env.
require('dotenv').config();



// Use the PORT from .env, or 3000 if it isn't set.
const PORT = process.env.PORT || 3000;
const app = require('./app');
// The Express app handles every request the server receives.
const server = http.createServer(app);

server.listen(PORT, () => {
    
    console.log(`Server running at http://localhost:${PORT}/`);
    }); 