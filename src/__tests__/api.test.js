const request = require('supertest');
const express = require('express');
const path = require('path');

// Create a test app
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

// Import the routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

describe('API Endpoints', () => {
    test('GET /api/hello should return hello message', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Hello from the API!');
    });

    test('GET / should serve index.html', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('GitHub Actions Test App');
    });
}); 