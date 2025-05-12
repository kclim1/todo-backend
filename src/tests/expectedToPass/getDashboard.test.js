// src/tests/expectedPass/dashboard.test.js
const request = require('supertest');
const app = require('../../app');

describe('GET /dashboard - Simple Placeholder Route', () => {
  it('should return 200 and a placeholder message', async () => {
    const res = await request(app).get('/dashboard');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe("this is the placeholder for dashboard page");
  });
});
