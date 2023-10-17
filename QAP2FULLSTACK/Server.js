const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    // Default file is index.html
    let fileName = 'index.html';

    // If URL is not root, use the URL path as the file name
    if (request.url !== '/') {
        fileName = request.url + '.html';
    }

    const filePath = path.join(__dirname, 'views', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // If the file doesn't exist, serve a 404
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('<h1>404 Page Not Found</h1>');
            } else {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
            }
            return;
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
