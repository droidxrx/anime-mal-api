import { httpApi, Obj } from "./utils.ts";
import { UserArray, UserField } from "./structures.ts";

export default class user {
    #token: string;
    constructor(access_token: string) {
        this.#token = access_token;
    }
    /**
     * Get my user information
     * @param {string[]} [fields] Array
     */
    me(fields: UserArray = UserField): Promise<Obj> {
        fields = fields ? fields : UserField;
        return httpApi(this.#token, "/users/@me", "get", { fields: fields });
    }
}
