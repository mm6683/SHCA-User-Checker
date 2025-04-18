const express = require('express');
const cors = require('cors');
const axios = require('axios'); // You'll use Axios to fetch data

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware to allow all requests from different domains
app.use(cors());

// Simple route for testing CORS
app.get('/api', async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/data'); // Change this to the real API you need
        res.json(response.data); // Send the API data back to the frontend
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
