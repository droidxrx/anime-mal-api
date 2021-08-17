const superagent = require("superagent");
module.exports = class BaseClass {
    #urlBase = "https://api.myanimelist.net/v2";
    constructor(access_token) {
        this.http = function (params) {
            return superagent.get(`${this.#urlBase}${params}`).auth(access_token, { type: "bearer" });
        };
    }
};
