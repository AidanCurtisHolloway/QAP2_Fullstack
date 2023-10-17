const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

const server = http.createServer((request, response) => {
    let fileName = 'index.html';

    // Ignore requests for apple touch icons
    if (request.url.includes('apple-touch-icon')) {
        response.writeHead(204);
        response.end();
        return;
    }

    if (request.url !== '/') {
        fileName = request.url + '.html';
        myEmitter.emit('nonHomeRoute', request.url);
    }

    const filePath = path.join(__dirname, 'views', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('<h1>404 Page Not Found</h1>');
                myEmitter.emit('fileNotFound', fileName);
            } else {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
                myEmitter.emit('serverWarning', err.message);
            }
            return;
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

// Listeners for our events
myEmitter.on('httpStatus', (statusCode) => {
    console.log(`HTTP status code emitted: ${statusCode}`);
});

myEmitter.on('serverWarning', (message) => {
    console.warn(`Server warning: ${message}`);
});

myEmitter.on('aboutAccessed', () => {
    console.log('About route was accessed.');
});

myEmitter.on('nonHomeRoute', (route) => {
    console.log(`Non-home route accessed: ${route}`);
});

myEmitter.on('fileReadSuccess', (fileName) => {
    console.log(`Successfully read the file: ${fileName}`);
});

myEmitter.on('fileNotFound', (fileName) => {
    console.error(`File not found: ${fileName}`);
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
