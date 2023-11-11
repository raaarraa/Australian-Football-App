const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://api.squiggle.com.au/?q=teams');
        if (!response.ok) {
            console.error(`Request failed with status ${response.status}: ${response.statusText}`);
            res.status(500).send(`Request failed with status ${response.status}: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        const teams = data.teams; 
        const formattedTeams = teams.map(team => {
            return {
                debut: team.debut,
                abrev: team.abrev,
                logo: team.logo,
                id: team.id,
                name: team.name,
                retirement: team.retirement
            };
        });
        res.render("homepage", { teams: formattedTeams });
    } catch (err) {
        console.error('Error fetching and parsing data:', err);
        res.status(500).send('Error fetching and parsing data');
    }
});

module.exports = router;
