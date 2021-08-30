import { baseTypeForList, httpApi, Obj } from "./utils";
import { MangaListArray, MangaListFields } from "./structures";

interface updateList extends baseTypeForList {
    status: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
    is_rereading: boolean;
    num_volumes_read: number;
    num_chapters_read: number;
    num_times_reread: number;
    reread_value: 0 | 1 | 2 | 3 | 4 | 5;
}

export default class userMangaList {
    #token: string;
    constructor(access_token: string) {
        this.#token = access_token;
    }

    /**
     * Get list anime from a user
     * @param user_name — Default "@me"
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    getList(user_name = "@me", offset = 0, limit = 100, fields: MangaListArray = MangaListFields): Promise<Obj> {
        fields = fields ? fields : MangaListFields;
        return httpApi(this.#token, `/users/${user_name}/mangalist`, "get", { offset, limit, fields });
    }

    /**
     * Delete a entry of the user's list.
     * @param manga_id
     */
    deleteList(manga_id: number): Promise<Obj> {
        return httpApi(this.#token, `/manga/${manga_id}/my_list_status`, "delete");
    }

    /**
     * Update a entry of the user's list.
     * @param manga_id
     * @param fieldsToUdpate
     */
    updateList(manga_id: number, fieldsToUdpate: updateList): Promise<Obj> {
        return httpApi(this.#token, `/manga/${manga_id}/my_list_status`, "put", fieldsToUdpate);
    }
}
