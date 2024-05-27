const request = require('supertest');
// const express = require('express');

const app = require('../../src/app');

describe('GET /non-existent-route', () => {
  it('should return 404 status and not found error message', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 'error',
      error: {
        message: 'not found',
        code: 404,
      },
    });
  });
});
