const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const liveScore = await fetch('https://api.squiggle.com.au/?q=games;live=1')
        if(!liveScore.ok) {
            res.render("no-live-matches");
        } else{
            liveScore = await liveScore.json();
            const score = liveScore.score[0];
            res.render("livescore", { liveScore });
        }
    } catch (error) {
        console.error("Error fetching live score:", error);
        res.render("error", { error });
    }
});

module.exports = router;
