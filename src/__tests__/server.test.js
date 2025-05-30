const request = require('supertest');
const express = require('express');
const path = require('path');

// Create a test app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Import and use the server routes
const server = require('../server');
app.use('/', server);

describe('Server', () => {
    test('GET / returns index.html', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
        expect(response.text).toContain('<!DOCTYPE html>');
    });

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

    test('GET /api/hello with empty query parameter returns default message', async () => {
        const response = await request(app).get('/api/hello?name=');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello from the API!' });
    });

    test('GET /api/hello with special characters in query parameter', async () => {
        const response = await request(app).get('/api/hello?name=Test%20User%21');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, Test User!!' });
    });
}); 