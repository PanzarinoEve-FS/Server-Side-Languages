const http = require('http');


const todos = [
    { id: 1, task: 'Task one'},
    { id: 2, task: 'Task two'},
    { id: 3, task: 'Task three'}
];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  res.end(
    JSON.stringify({
        success: true,
        method: req.method,
        data: todos,
    })
  );
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    }); 