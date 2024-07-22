// tests/unit/app.test.js

const request = require('supertest');

// Get our Express app object (we don't need the server part)
const app = require('../../src/app');

describe('404 middleware', ()=>{
  test('should return 404 for unknown errors', async()=>{
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
       status: 'error',
       error: {
        message: 'not found',
        code: 404,
       },
    })
  })
})


