import * as http from 'http';

test('POST /api/users should add a new user', async () => {
  const PORT = process.env.PORT || 3000;
  const newUser = {
    username: 'TestUser',
    age: 30,
    hobbies: ['Reading', 'Gaming']
  };

  const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
    const req = http.request({
      method: 'POST',
      host: 'localhost',
      port: PORT,
      path: '/api/users',
      headers: {
        'Content-Type': 'application/json',
      }
    }, (res) => {
      resolve(res);
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(JSON.stringify(newUser));
    req.end();
  });

  expect(response.statusCode).toBe(201);

  let data = '';
  await new Promise<void>((resolve, reject) => {
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const user = JSON.parse(data);
        expect(user.username).toBe(newUser.username);
        expect(user.age).toBe(newUser.age);
        expect(user.hobbies).toEqual(newUser.hobbies);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
});
