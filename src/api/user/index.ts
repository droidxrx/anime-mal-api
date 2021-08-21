import baseclass from "../baseclass";
import structures from "./structures";

type me = string[] | string;
export default class user extends baseclass {
    constructor(access_token: string) {
        super(access_token);
    }
    /**
     * Get my user information
     * @param {string[] | string} [fields] {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/user/structures.ts click me}
     */
    me(fields: me = structures) {
        return this.get("/users/@me", { fields: fields.toString() });
    }
}
