const express = require('express');
const path = require('path');
const server = require('./server');

const app = express();
const port = process.env.PORT || 3000;

// Use the server routes
app.use('/', server);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint
app.get('/api/hello', (req, res) => {
    const name = req.query.name;
    const message = name ? `Hello, ${name}!` : 'Hello from the API!';
    res.json({ message });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
}); 