/// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
var http = require('http');
var fs = require('fs');
var path = require('path');
const port = 4000

http.createServer(function(request, response) {
    // console.log('request ', request.url);

    /// Initial route
    var filePath = './src' + request.url;
    if (filePath == './src/') filePath = './src/index.html';

    /// Look for the extension of the file being requested and see if it matches with one of our MIME types. If no matches are found, we use the application/octet-stream as the default type.
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
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

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
        response.writeHead(200, { 'Content-Type': contentType });
        response.end('<h1 style="color:green;">app1</h1>', 'utf-8');
    });

}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);