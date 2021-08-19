const express = require("express");
const cors = require("cors");
const fs = require("./loadWriteJson");
const path = require("path");
const MAP_API = require("..");

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const urlRedirect = `${LOCALHOST}/oauth2`;

const CLIENT_ID = "0b9ce2d2253456ec76cb2b974fe5bc6f";
const CLIENT_SECRET = undefined;
const MAL_TOKEN = new MAP_API.MAL_OAUTH2(CLIENT_ID, CLIENT_SECRET /** CLIENT_SECRET is optional */);

const pkce = MAL_TOKEN.generatePKCEChallenge();
const urlOAUTH2 = MAL_TOKEN.urlAuthorize(pkce.code_challenge, urlRedirect /** urlRedirect is optional */);

const app = express();
app.use(cors());

const indexHTML = path.join(__dirname, "/index.html");
const db = path.join(__dirname, "/db.json");

app.get("/", (req, res) => res.sendFile(indexHTML));

app.get("/oauth2/:params?", (req, res) => {
    const params = req.params.params;
    const code = req.query.code;

    if (!params && code) {
        const getToken = MAL_TOKEN.accessToken(code, fs.loadData(db).pkce.code_challenge);
        getToken.then(thenorcatch).catch(thenorcatch);
    } else if (params == "refreshToken") {
        const refrToken = MAL_TOKEN.refreshToken(fs.loadData(db).token.refresh_token);
        refrToken.then(thenorcatch).catch(thenorcatch);
    } else if (params == "authorize") {
        fs.writeData(db, { pkce: pkce });
        res.redirect(urlOAUTH2);
    } else {
        res.redirect("/");
    }

    function thenorcatch(response) {
        const isError = "error" in response;
        if (!isError) {
            fs.writeData(db, Object.assign(fs.loadData(db), { token: response }));
            return res.json({ status: true, message: "Token Stored to DataBase" });
        }
        res.json(Object.assign({ status: false }, response));
    }
});

app.get("/search/:anime", (req, res) => {
    const MAL_API_ANIME = new MAP_API.MAL_API_ANIME(fs.loadData(db).token.access_token);
    const params = req.params.anime;
    const query = req.query;

    if (params == "anime" && "id" in query) {
        const sAnimeId = MAL_API_ANIME.animeId(query);
        sAnimeId.then(thenorcatch).catch(thenorcatch);
    } else if (params == "anime" && "q" in query) {
        const sAnimeQ = MAL_API_ANIME.animeSearch(query);
        sAnimeQ.then(thenorcatch).catch(thenorcatch);
    }

    function thenorcatch(response) {
        const isError = "error" in response;
        if (!isError) {
            return res.json({ status: true, result: response });
        }
        res.json(Object.assign({ status: false }, response));
    }
});
app.listen(PORT, () => {
    console.log(`Server Listening ${LOCALHOST}`);
});
