// Import the http module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const port = 3001;

// Function to determine the content type based on file extension
function getContentType(filePath) {
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    return mimeTypes[extname] || 'application/octet-stream';
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Build the file path based on the request URL
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Extract the file extension to determine the content type
    const contentType = getContentType(filePath);

    // Read the file from the file system
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, return a 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Some server error occurred
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // If the file is found, serve it with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server and listen for incoming requests
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
