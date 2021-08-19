import { get as fetGet } from "superagent";
export default class baseclass {
    private urlBase = "https://api.myanimelist.net/v2";
    private token: string;
    constructor(access_token: string) {
        this.token = access_token;
    }

    get(params: string) {
        return fetGet(`${this.urlBase}${params}`).auth(this.token, { type: "bearer" });
    }
}
