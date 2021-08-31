import { baseTypeForList, httpApi, Obj } from "./utils.ts";
import { AnimeListArray, AnimeListFields } from "./structures.ts";

interface updateList extends baseTypeForList {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    is_rewatching: boolean;
    num_watched_episodes: number;
    num_times_rewatched: number;
    rewatch_value: 0 | 1 | 2 | 3 | 4 | 5;
}

export default class userAnimeList {
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
    getList(user_name: string = "@me", offset: number = 0, limit: number = 100, fields: AnimeListArray = AnimeListFields): Promise<Obj> {
        fields = fields ? fields : AnimeListFields;
        return httpApi(this.#token, `/users/${user_name}/animelist`, "get", { offset, limit, fields });
    }

    /**
     * Delete a entry of the user's list.
     */
    deleteList(anime_id: number): Promise<Obj> {
        return httpApi(this.#token, `/anime/${anime_id}/my_list_status`, "delete");
    }

    /**
     * Update a entry of the user's list.
     * @param {number} anime_id
     * @param {object} fieldsToUdpate
     */
    updateList(anime_id: number, fieldsToUdpate: updateList): Promise<Obj> {
        return httpApi(this.#token, `/anime/${anime_id}/my_list_status`, "put", fieldsToUdpate);
    }
}
