import * as http from 'http';
import { userInterfase } from './model/userModel';

const PORT = process.env.PORT || 3000;

const users: userInterfase[] = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  let body: string = '';

  request.on('data', data => {
    body = data;
  });

  request.on('end', () => {
    response.end();
  });

  if (method === 'GET' && url === '/api/users') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(users));
  } else if (method === 'GET' && url?.startsWith('/api/users/')) {
    const userId = url.split('/')[3];
    const user = users.find(user => user.id === userId);
    if (user) {
      try {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(user));
      } catch (err) {
        response.writeHead(500, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: err }));
      }
    } else {
      response.writeHead(404, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({ message: 'User not found' }));
    }
  } else if (method === 'POST' && url === '/api/users') {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || !age || !hobbies) {
      try {
        response.writeHead(400, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: 'Body doesn\'t contains all requirements'}));
      } catch (err) {
        response.writeHead(500, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: err }));
      }
    } else {
      const userId = idGenerator();
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
    const userId = users.findIndex(user => user.id === id);
    if (userId !== -1) {
      try {
        const { username, age, hobbies } = JSON.parse(body);
        users[userId].age = age;
        users[userId].hobbies = hobbies;
        users[userId].userName = username;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(users[userId]));
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
    const userId = users.findIndex(user => user.id === id);
    if (userId !== -1) {
      try {
        users.splice(userId, 1);
        response.writeHead(204, {'Content-Type': 'application/json'});
        response.end();
      } catch (err) {
        response.writeHead(500, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: err }));
      }
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'User not found' }));
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Wrong request!' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server has been running on the ${PORT} port`);
});


const idGenerator = (): string => {
  const id = (Math.random() * 1000).toString(16);
  const user = users.find(user => user.id === id);
  if (user) {
    return idGenerator();
  } else {
    return id;
  }
};
