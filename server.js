const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = {};
    const groups = [];
    const logos = {};

    try {
        // Get user info
        const userInfoRes = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
        Object.assign(user, userInfoRes.data);

        // Get friends count
        const friendsRes = await axios.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
        user.friendCount = friendsRes.data.count;

        // Get avatar URL
        const avatarRes = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
        const avatarUrl = avatarRes.data.data[0].imageUrl;

        // Get groups
        const groupRes = await axios.get(`https://groups.roblox.com/v2/users/${userId}/groups/roles`);
        for (const group of groupRes.data.data) {
            groups.push({
                id: group.group.id,
                name: group.group.name,
                role: group.role.name
            });
        }

        // Get logos for all groups (only logos needed)
        const groupIds = groups.map(g => g.id).join(',');
        if (groupIds.length > 0) {
            const logoRes = await axios.get(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupIds}&size=100x100&format=Png&isCircular=false`);
            for (const entry of logoRes.data.data) {
                logos[entry.targetId] = entry.imageUrl;
            }
        }

        res.json({ user, avatarUrl, groups, groupLogos: logos });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve user data', details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
});
