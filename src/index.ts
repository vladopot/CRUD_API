import * as http from 'http';
import { userInterfase } from './model/userModel';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 3000;

const users: userInterfase[] = [
    {
        id: '542234',
        userName: 'Vlad',
        age: 24,
        hobbies: [
            'swimming',
            'judo'
        ]
    }
];

const server = http.createServer((request, response) => {
    const { method, url } = request;

    let body: string = '';

    request.on('data', data => {
        body += data;
    });

    request.on('end', () => {
        if (method === 'GET' && url === '/api/users') {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(users));
        } else if (method === 'GET' && url?.startsWith('/api/users/')) {
            const userId = url.split('/')[3];
            const user = users.find(user => user.id === userId);
            if (user) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(user));
            } else {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ message: 'User not found' }));
            }
        } else if (method === 'POST' && url === '/api/users') {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ message: 'Body doesn\'t contain all requirements'}));
            } else {
                const userId = uuidv4();
                const user: userInterfase = {
                    id: userId,
                    userName: username,
                    age: age,
                    hobbies: hobbies
                };
                users.push(user);
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(user));
            }
        } else if (method === 'PUT' && url?.startsWith('/api/users/')) {
            const id = url.split('/')[3];
            const userIdx = users.findIndex(user => user.id === id);
            if (userIdx !== -1) {
                try {
                    const { username, age, hobbies } = JSON.parse(body);
                    if (!username || !age || !hobbies) {
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end(JSON.stringify({ message: 'Body doesn\'t contain all requirements'}));
                    } else {
                        users[userIdx].age = age;
                        users[userIdx].hobbies = hobbies;
                        users[userIdx].userName = username;
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end(JSON.stringify(users[userIdx]));
                    }
                } catch (err) {
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({ message: err }));
                }
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'User not found' }));
            }
        } else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
            const id = url.split('/')[3];
            const userIdx = users.findIndex(user => user.id === id);
            if (userIdx !== -1) {
                users.splice(userIdx, 1);
                response.writeHead(204, {'Content-Type': 'application/json'});
                response.end();
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'User not found' }));
            }
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Wrong request!' }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server has been running on the ${PORT} port`);
});
