// netlify/functions/getGame.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const gameId = event.queryStringParameters.gameId;  // Get the gameId from the query parameters

    if (!gameId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'gameId parameter is required' }),
        };
    }

    try {
        // Roblox API URL
        const apiUrl = `https://games.roblox.com/v1/games?universeIds=${gameId}`;
        const response = await fetch(apiUrl);
        const gameData = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(gameData),  // Send back the game data to the client
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch game data' }),
        };
    }
};
