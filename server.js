const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Serve static files from the "docs" folder
app.use(express.static(path.join(__dirname, 'docs')));

// Set up a basic route for the API (optional, for now)
app.get('/api/test', (req, res) => {
    res.json({ message: "API is working!" });
});

// Catch-all handler to serve index.html for any route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
