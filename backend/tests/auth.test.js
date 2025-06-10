const request = require('supertest');
const app = require('../src/app');

describe('Authentication', () => {
  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@hospital.com',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  test('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@hospital.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });

  test('should require authentication for protected routes', async () => {
    const response = await request(app)
      .get('/api/users');

    expect(response.status).toBe(401);
  });
});