const http = require('http');

const server = http.createServer((request, response) => {
    switch (request.url) {
        case '/about':
            console.log('About route accessed');
            response.end('About Page');
            break;
        case '/contact':
            console.log('Contact route accessed');
            response.end('Contact Page');
            break;
        case '/products':
            console.log('Products route accessed');
            response.end('Products Page');
            break;
        case '/subscribe':
            console.log('Subscribe route accessed');
            response.end('Subscribe Page');
            break;
        case '/':
            console.log('Home route accessed');
            response.end('Home Page');
            break;
        default:
            console.log('Unknown route accessed');
            response.end('404 Page Not Found');
    }
});

// Step 7
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
