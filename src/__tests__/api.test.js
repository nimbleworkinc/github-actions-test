/**
 * @jest-environment node
 */
const request = require('supertest');
const express = require('express');
const path = require('path');

// Create a test app
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Import the routes
app.get('/api/hello', (req, res) => {
    const name = req.query.name;
    const message = name ? `Hello, ${name}!` : 'Hello from the API!';
    res.json({ message });
});

describe('API Tests', () => {
    test('GET /api/hello returns hello message', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello from the API!' });
    });

    test('GET /api/hello with query parameter returns personalized message', async () => {
        const response = await request(app).get('/api/hello?name=TestUser');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, TestUser!' });
    });

    test('GET / should serve index.html', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('GitHub Actions Test App');
    });
}); 