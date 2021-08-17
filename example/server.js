const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
const MAP_API = require("..");

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const urlRedirect = `${LOCALHOST}/oauth2`;

const CLIENT_ID = "0b9ce2d2253456ec76cb2b974fe5bc6f";
const CLIENT_SECRET = undefined;
const MAL_TOKEN = new MAP_API.MAL_TOKEN(CLIENT_ID, CLIENT_SECRET /** CLIENT_SECRET is optional */);

const db = MAL_TOKEN.generatePKCEChallenge();
const urlOAUTH2 = MAL_TOKEN.urlAuthorize(db.code_challenge, urlRedirect /** urlRedirect is optional */);

const oauth2Token = express.Router().get("/oauth2/:params?", (req, res) => {
    const params = req.params.params;
    const code = req.query.code;

    if (!params && code) {
        MAL_TOKEN.accessToken(code, db.code_challenge)
            .then((response) => {
                db.token = response;
                res.json(response);
            })
            .catch((error) => res.json(error));
    } else if (params == "refreshToken") {
        MAL_TOKEN.refreshToken(db.token.refresh_token)
            .then((response) => res.json(response))
            .catch((error) => res.json(error));
    } else if (params == "authorize") {
        res.redirect(urlOAUTH2);
    } else {
        res.redirect("/");
    }
});

const app = express();
app.use(cors());
app.use(oauth2Token);

app.get("/", (req, res) => {
    res.sendFile(resolve("example/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Listening ${LOCALHOST}`);
});
