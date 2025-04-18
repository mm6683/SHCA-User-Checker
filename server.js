const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint: GET /userinfo?username=USERNAME
app.get("/userinfo", async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    // Step 1: Get user ID from username
    const userRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username] })
    });

    if (!userRes.ok) throw new Error("Failed to fetch user ID");

    const userData = await userRes.json();
    const user = userData.data?.[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    // Step 2: Return user info
    res.json({
      id: user.id,
      name: user.name,
      displayName: user.displayName
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
