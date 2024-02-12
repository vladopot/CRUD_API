import http from 'http';

const PORT = 3000;

const server = http.createServer((request, response) => {
    const { method, url, headers } = request;

    
});

server.listen(PORT, () => {
    console.log(`Server has been running on the ${PORT} port`);
});