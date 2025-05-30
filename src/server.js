const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files
router.use(express.static(path.join(__dirname, 'public')));

// API endpoint
router.get('/api/hello', (req, res) => {
    const name = req.query.name?.trim();
    const message = name ? `Hello, ${name}!` : 'Hello from the API!';
    res.json({ message });
});

// Serve index.html for the root route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = router; 