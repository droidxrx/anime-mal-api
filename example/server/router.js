const { Router } = require("express");
const fs = require("fs-extra");
const API = require("anime-mal-api");

exports.oauth2 = function (CLIENT_ID, jsonFile, urlRedirect) {
    const OAUTH2 = new API.MAL_OAUTH2(CLIENT_ID);
    const pkce = OAUTH2.generatePKCEChallenge();

    const urlOAUTH2 = OAUTH2.urlAuthorize(pkce.code_challenge, urlRedirect);

    const router = Router().get("/oauth2/:params?", (req, res) => {
        const params = req.params.params;
        const code = req.query.code;

        function thenorcatch(response) {
            const isError = "error" in response;
            if (!isError) {
                const data = fs.readJsonSync(jsonFile);
                const _assign = Object.assign(data, { token: response });
                fs.writeJsonSync(jsonFile, _assign);
                return res.json(response);
            }
            res.json(response);
        }

        if (params == "authorize") {
            if (fs.existsSync(jsonFile)) {
                const data = fs.readJsonSync(jsonFile);
                const _assign = Object.assign(data, { pkce });
                fs.writeJsonSync(jsonFile, _assign);
            } else {
                fs.writeJsonSync(jsonFile, { pkce });
            }
            return res.redirect(urlOAUTH2);
        }

        if (!params && code) {
            const data = fs.readJsonSync(jsonFile);
            const getToken = OAUTH2.accessToken(code, data.pkce.code_challenge);
            return getToken.then(thenorcatch).catch(thenorcatch);
        }

        if (params == "refreshToken") {
            const data = fs.readJsonSync(jsonFile);
            const refrToken = OAUTH2.refreshToken(data.token.refresh_token);
            return refrToken.then(thenorcatch).catch(thenorcatch);
        }

        res.redirect("/");
    });

    return router;
};

exports.search = function (jsonFile) {
    const access_token = fs.readJsonSync(jsonFile).token.access_token;

    const ANIME = new API.MAL_API_ANIME(access_token);
    const ANIME_LIST = new API.MAL_API_ANIME_LIST(access_token);
    const MANGA = new API.MAL_API_MANGA(access_token);
    const MANGA_LIST = new API.MAL_API_MANGA_LIST(access_token);
    const USER = new API.MAL_API_USER(access_token);

    const router = Router().get("/search/:anime", (req, res) => {
        const params = req.params.anime;
        const query = req.query;

        function callback(response) {
            res.json(response);
        }

        if (params == "anime" && "id" in query) {
            const anime = ANIME.animeId(query);
            return anime.then(callback).catch(callback);
        }

        if (params == "anime" && "q" in query) {
            const anime = ANIME.animeSearch(query);
            return anime.then(callback).catch(callback);
        }

        if (params == "anime" && "ranking_type" in query) {
            const anime = ANIME.animeRanking(query);
            return anime.then(callback).catch(callback);
        }
    });

    return router;
};
