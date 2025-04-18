// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Handle the /user/:id route to fetch Roblox user data
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
