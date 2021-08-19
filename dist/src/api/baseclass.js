Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = require("superagent");
class baseclass {
    constructor(access_token) {
        this.urlBase = "https://api.myanimelist.net/v2";
        this.token = access_token;
    }
    get(params) {
        return superagent_1.get(`${this.urlBase}${params}`).auth(this.token, { type: "bearer" });
    }
}
exports.default = baseclass;
