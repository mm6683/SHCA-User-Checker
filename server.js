const express = require("express");
const path = require("path");
const app = express();

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, "frontend")));

// Default route serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Your backend API routes here
// e.g. app.get("/api", (req, res) => { ... });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
