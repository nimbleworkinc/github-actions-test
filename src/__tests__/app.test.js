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
    });

    test('Build information is displayed', () => {
        // Mock the DOMContentLoaded event
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

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