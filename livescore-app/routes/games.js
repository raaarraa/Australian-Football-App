const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://api.squiggle.com.au/?q=games;year=2023;round=1');
        if (!response.ok) {
            console.error(`Request failed with status ${response.status}: ${response.statusText}`);
            res.status(500).send(`Request failed with status ${response.status}: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        const games = data.games; 
        const formattedGames = games.map(game => {
            return {
                winner: game.winner,
                is_final: game.is_final,
                localtime: game.localtime,
                round: game.round,
                hteam: game.hteam,
                ateam: game.ateam,
                winnerteamid: game.winnerteamid,
                is_grand_final: game.is_grand_final,
                hscore: game.hscore,
                date: game.date,
                ascore: game.ascore,
                ateamid: game.ateamid,
                hteamid: game.hteamid,
                roundname: game.roundname,
                abehinds: game.abehinds,
                hbehinds: game.hbehinds,
                complete: game.complete,
                venue: game.venue,
                updated: game.updated,
                tz: game.tz,
                timestr: game.timestr,
                id: game.id,
                unixtime: game.unixtime,
                year: game.year,
                hgoals: game.hgoals,
                agoals: game.agoals
            };
        });
        res.render("games", { games: formattedGames });
    } catch (err) {
        console.error('Error fetching and parsing data:', err);
        res.status(500).send('Error fetching and parsing data');
    }
});

module.exports = router;
