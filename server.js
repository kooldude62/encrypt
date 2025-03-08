// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Route to fetch game data
app.get('/api/game/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        // Roblox API URL
        const apiUrl = `https://games.roblox.com/v1/games?universeIds=${gameId}`;
        const response = await fetch(apiUrl);
        const gameData = await response.json();

        // Send the game data as response
        res.json(gameData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
