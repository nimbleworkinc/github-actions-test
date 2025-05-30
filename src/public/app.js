document.addEventListener('DOMContentLoaded', () => {
    // Set build information
    document.getElementById('package-manager').textContent = 'npm/yarn';
    document.getElementById('build-time').textContent = new Date().toLocaleString();

    // API test button
    const fetchButton = document.getElementById('fetchApi');
    const apiResponse = document.getElementById('apiResponse');

    fetchButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/hello');
            const data = await response.json();
            
            apiResponse.style.display = 'block';
            apiResponse.textContent = `API Response: ${data.message}`;
        } catch (error) {
            apiResponse.style.display = 'block';
            apiResponse.textContent = `Error: ${error.message}`;
        }
    });
}); 