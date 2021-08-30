import { httpApi, Obj } from "./utils";
import { UserArray, UserField } from "./structures";

export default class user {
    #token: string;
    constructor(access_token: string) {
        this.#token = access_token;
    }
    /**
     * Get my user information
     * @param fields Array
     */
    me(fields: UserArray = UserField): Promise<Obj> {
        fields = fields ? fields : UserField;
        return httpApi(this.#token, "/users/@me", "get", { fields: fields });
    }
}
