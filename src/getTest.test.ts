import * as http from 'http';

test('GET /api/users should return list of users', (done) => {
  const PORT = process.env.PORT || 3000;
  http.get(`http://localhost:${PORT}/api/users`, (res) => {
    expect(res.statusCode).toBe(200);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const users = JSON.parse(data);
      expect(Array.isArray(users)).toBe(true);
      done();
    });
  });
});