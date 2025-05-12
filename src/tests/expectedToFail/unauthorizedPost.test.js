// src/tests/todo.auth.test.js
const request = require('supertest');
const app = require('../../app');

describe('POST /api/v1/todos - Unauthorized (No JWT)', () => {
  it('should return 403 if no JWT is provided', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .send({
        title: "Test Todo",
        description: "This is a test todo"
      });
    
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Access denied. No token provided.");
  });
});
