const express = require('express');
const app = express();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const teams = [
    { name: 'Adelaide' },
    { name: 'Brisbane Lions' },
    { name: 'Carlton' },
    { name: 'Collingwood' },
    { name: 'Essendon' },
    { name: 'Fremantle' },
    { name: 'Geelong' },
    { name: 'Gold Coast' },
    { name: 'Greater Western Sydney' },
    { name: 'Hawthorn' },
    { name: 'Melbourne' },
    { name: 'North Melbourne' },
    { name: 'Port Adelaide' },
    { name: 'Richmond' },
    { name: 'St Kilda' },
    { name: 'Sydney' },
    { name: 'West Coast' },
    { name: 'Western Bulldogs' }
];

function getLogoFilename(teamName) {
    return `${teamName.replace(/\s/g, '')}.svg`;
}

teams.forEach((team) => {
    team.logo = getLogoFilename(team.name);
});

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.json());

const homepageRouter = require("./routes/homepage");   //homepage, pe care o sa meciurile de azi si de zilele urmatoare
const standingsRouter = require("./routes/standings"); //standings, pe care o sa fie clasamentul
const livescoreRouter = require("./routes/livescore"); //livescore, pe care o sa fie meciurile live, cu scorul in timp real, minutul si statistici (vedem cat de complicat e)
const gamesRouter = require("./routes/games");

app.use("/", homepageRouter);
app.use("/standings", standingsRouter);
app.use("/livescore", livescoreRouter);
app.use("/games", gamesRouter);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});