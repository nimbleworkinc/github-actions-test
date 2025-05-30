/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Load the app.js content
const appJs = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');

describe('Frontend App', () => {
    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
            <div class="container">
                <span id="package-manager">Loading...</span>
                <span id="build-time">Loading...</span>
                <button id="fetchApi">Test API</button>
                <div id="apiResponse" class="api-response"></div>
            </div>
        `;

        // Create a script element and execute app.js
        const script = document.createElement('script');
        script.textContent = appJs;
        document.body.appendChild(script);

        // Manually trigger initialization since we're in a test environment
        if (typeof window.initializeApp === 'function') {
            window.initializeApp();
        }
    });

    test('Build information is displayed', () => {
        // Check if build information is set
        expect(document.getElementById('package-manager').textContent).toBe('npm/yarn');
        expect(document.getElementById('build-time').textContent).not.toBe('Loading...');
    });

    test('API response is displayed when button is clicked', async () => {
        // Mock fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Hello from the API!' })
            })
        );

        // Trigger button click
        document.getElementById('fetchApi').click();

        // Wait for the async operation
        await new Promise(resolve => setTimeout(resolve, 0));

        // Check if API response is displayed
        const apiResponse = document.getElementById('apiResponse');
        expect(apiResponse.style.display).toBe('block');
        expect(apiResponse.textContent).toContain('Hello from the API!');
    });
}); 