// Set up test environment
process.env.NODE_ENV = 'test';

// Mock fetch for browser environment
global.fetch = jest.fn();

// Set up different test environments for different test files
const path = require('path');

// If the test file is in the api directory, use node environment
if (path.basename(process.env.JEST_WORKER_ID).includes('api.test.js')) {
    process.env.JEST_ENV = 'node';
} else {
    process.env.JEST_ENV = 'jsdom';
} 