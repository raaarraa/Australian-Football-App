const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://api.squiggle.com.au/?q=standings');
        if (!response.ok) {
            console.error(`Request failed with status ${response.status}: ${response.statusText}`);
            res.status(500).send(`Request failed with status ${response.status}: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        res.render("standings", { data }); 

    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        res.status(500).send('Error fetching and parsing data');
    }
});

module.exports = router;
