const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Root route serving the frontend (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Add any other routes you need below, for example:
// app.get('/api/some-endpoint', (req, res) => {
//   res.json({ message: 'Your response here' });
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
