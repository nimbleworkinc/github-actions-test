const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Start server
app.listen(port); 