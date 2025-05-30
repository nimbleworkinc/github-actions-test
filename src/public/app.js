// Get build information from environment variables
const packageManager = process.env.PACKAGE_MANAGER || 'npm/yarn';
const buildTime = process.env.BUILD_TIME || new Date().toISOString();

// Update build information in the UI
document.getElementById('package-manager').textContent = packageManager;
document.getElementById('build-time').textContent = buildTime;

// Add click handler for API test button
document.getElementById('fetchApi').addEventListener('click', async () => {
    const apiResponse = document.getElementById('apiResponse');
    apiResponse.style.display = 'block';
    apiResponse.textContent = 'Loading...';

    try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        apiResponse.textContent = `API Response: ${data.message}`;
    } catch (error) {
        apiResponse.textContent = `Error: ${error.message}`;
    }
}); 