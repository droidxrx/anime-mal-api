const mal_api = require("anime-mal-api");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const CLIENT_ID = "0b9ce2d2253456ec76cb2b974fe5bc6f";
const oauth2 = new mal_api.OAUTH2(CLIENT_ID);

const CODE_CHALLENGE = oauth2.generatePKCEChallenge().code_challenge;
const urlAuthorize = oauth2.urlAuthorize(CODE_CHALLENGE);

app.get("/", (req, res) => {
    res.redirect(urlAuthorize);
});

app.get("/malapi", (req, res) => {
    const code = req.query.code;
    oauth2
        .accessToken(code, CODE_CHALLENGE)
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
});

app.listen(8080);
