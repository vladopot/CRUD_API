import * as http from 'http';

test('PUT /api/users/:id should update user information', (done) => {
  const PORT = process.env.PORT || 3000;
  const updatedUserInfo = {
    username: 'UpdatedUser',
    age: 35,
    hobbies: ['Swimming', 'Cooking']
  };
  const userIdToUpdate = '542234';

  const req = http.request({
    method: 'PUT',
    host: 'localhost',
    port: PORT,
    path: `/api/users/${userIdToUpdate}`,
    headers: {
      'Content-Type': 'application/json',
    }
  }, (res) => {
    expect(res.statusCode).toBe(200);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const updatedUser = JSON.parse(data);
        expect(updatedUser.username).toBe(updatedUserInfo.username);
        expect(updatedUser.age).toBe(updatedUserInfo.age);
        expect(updatedUser.hobbies).toEqual(updatedUserInfo.hobbies);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  req.on('error', (err) => {
    done(err);
  });

  req.write(JSON.stringify(updatedUserInfo));
  req.end();
});
