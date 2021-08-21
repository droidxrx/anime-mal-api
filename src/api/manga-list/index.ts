import baseclass from "../baseclass";
import structures from "./structures";

type getList = {
    user_name?: string;
    offset?: number;
    limit?: number;
    fields?: string[];
};

type updateList = {
    status: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
    is_rereading: boolean;
    score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    num_volumes_read: number;
    num_chapters_read: number;
    priority: 0 | 1 | 2;
    num_times_reread: number;
    reread_value: 0 | 1 | 2 | 3 | 4 | 5;
    tags: string;
    comments: string;
};

export default class manga_list extends baseclass {
    constructor(access_token: string) {
        super(access_token);
    }

    /**
     * Get list anime from a user
     * @property user_name — string default "@me"
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga-list/structures.ts click me}
     */
    getList({ user_name = "@me", offset = 0, limit = 100, fields = structures }: getList) {
        const query = { offset, limit, fields: fields.toString() };
        return this.get(`/users/${user_name}/mangalist`, query);
    }

    /**
     * Delete a entry of the user's list.
     */
    deleteList(manga_id: number) {
        return this.del("manga", manga_id);
    }

    /**
     * Update a entry of the user's list.
     * @param  {number} anime_id
     * @param  {object} fieldsToUdpate {@link updateList click me}
     */
    updateList(anime_id: number, fieldsToUdpate: updateList) {
        return this.put("manga", anime_id, fieldsToUdpate);
    }
}
