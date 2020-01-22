const http = require('http');
var fs = require('fs');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    fs.readFile('public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
});

// Start the server on port 3000
app.listen(3020, '127.0.0.1');
console.log('Node server running on port 3000');
