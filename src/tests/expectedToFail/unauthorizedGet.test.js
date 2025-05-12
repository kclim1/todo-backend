// src/tests/todo.unauth.test.js
const request = require('supertest');
const app = require('../../app');

describe('GET /api/v1/todos - Unauthorized (No JWT)', () => {
  it('should return 403 access denied if no JWT is provided in header', async () => {
    const res = await request(app).get('/api/v1/todos');

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Access denied. No token provided.");
  });
});
