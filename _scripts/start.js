const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer((request, response) => {
    let name;
    let file;
    try{
        if (request.url === '/') {
            name = path.resolve(process.cwd(), './_layouts/default.html');
        } else {
            name = path.join(process.cwd(), request.url);
        }
        file = fs.readFileSync(name);
    } catch(e) {
        console.error(`Requested file not founded: ${ request.url }`);
        response.writeHead(404);
        file = '404 Not Found';
    }finally{
        response.end(file);
    }
});
server.listen(8888, (err) => {
    if (err) {
        return console.error('Error:', err);
    }
    console.log('Listening port 8888.');
} );
