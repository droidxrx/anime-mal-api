interface codepair {
    code_challenge: string;
    code_verifier: string;
}
declare type baseTypeForList = {
    score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    priority: 0 | 1 | 2;
    tags: string;
    comments: string;
};
declare type Obj = {
    [key: string]: any;
};

declare type AnimeFullArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios" | "pictures" | "background" | "related_anime" | "related_manga" | "recommendations" | "statistics">;
declare type AnimeInListArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios">;
declare type AnimeListArray = Array<"status" | "score" | "num_watched_episodes" | "is_rewatching" | "start_date" | "finish_date" | "priority" | "num_times_rewatched" | "rewatch_value" | "tags" | "updated_at" | "id" | "title" | "main_picture" | "alternative_titles" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "media_type" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios">;
declare type MangaFullArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_volumes" | "num_chapters" | "authors" | "pictures" | "background" | "related_anime" | "related_manga" | "recommendations" | "serialization">;
declare type MangaInListArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_volumes" | "num_chapters" | "authors">;
declare type MangaListArray = Array<"status" | "score" | "num_volumes_read" | "num_chapters_read" | "is_rereading" | "start_date" | "finish_date" | "priority" | "num_times_reread" | "reread_value" | "tags" | "updated_at" | "id" | "title" | "main_picture" | "alternative_titles" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "media_type" | "my_list_status" | "num_volumes" | "num_chapters" | "authors">;
declare type UserArray = Array<"id" | "name" | "picture" | "gender" | "birthday" | "location" | "joined_at" | "anime_statistics" | "time_zone" | "is_supporter">;

declare type animeid = string | number;
declare type rankingtype = "all" | "airing" | "upcoming" | "tv" | "ova" | "movie" | "special" | "bypopularity" | "favorite";
declare type season = "winter" | "spring" | "summer" | "fall";
declare type sort = "anime_score" | "anime_num_list_users" | "";
declare class anime {
    constructor(access_token: string);
    /**
     * Specific anime by id, and return the anime with all details
     * @param id — MAL Anime ID
     * @param fields — Array
     */
    id(id: animeid, fields?: AnimeFullArray): Promise<Obj>;
    /**
     * List of animes via a query text search
     * @param q — Text
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    search(q: string, offset?: number, limit?: number, fields?: AnimeInListArray): Promise<Obj>;
    /**
     * Ranking animes, with all type of rankings
     * @param ranking_type — string {@link rankingtype ranking_type}
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    ranking(ranking_type?: rankingtype, offset?: number, limit?: number, fields?: AnimeInListArray): Promise<Obj>;
    /**
     * Seasonal Anime, by default is filled at actual season
     * @param year — Default Current Year
     * @param season — Default Current Season
     * @param offset — Default 0
     * @param limit — Default 100
     * @param sort — Default ""
     * @param fields — Array
     */
    seasonal(year?: number, season?: season, offset?: number, limit?: number, sort?: sort, fields?: AnimeInListArray): Promise<Obj>;
    /**
     * Anime suggestion from MAL
     * @param offset — number default 0
     * @param limit — number default 100
     * @param fields — array
     */
    suggestions(offset?: number, limit?: number, fields?: AnimeInListArray): Promise<Obj>;
}

interface updateList$1 extends baseTypeForList {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    is_rewatching: boolean;
    num_watched_episodes: number;
    num_times_rewatched: number;
    rewatch_value: 0 | 1 | 2 | 3 | 4 | 5;
}
declare class userAnimeList {
    constructor(access_token: string);
    /**
     * Get list anime from a user
     * @param user_name — Default "@me"
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    getList(user_name?: string, offset?: number, limit?: number, fields?: AnimeListArray): Promise<Obj>;
    /**
     * Delete a entry of the user's list.
     */
    deleteList(anime_id: number): Promise<Obj>;
    /**
     * Update a entry of the user's list.
     * @param {number} anime_id
     * @param {object} fieldsToUdpate
     */
    updateList(anime_id: number, fieldsToUdpate: updateList$1): Promise<Obj>;
}

declare type typeRanking = "all" | "manga" | "novels" | "oneshots" | "doujin" | "manhwa" | "manhua" | "bypopularity" | "favorite";
declare class manga {
    constructor(access_token: string);
    /**
     * Specific manga by id, and return the manga with all details
     * @param id — MAL Manga ID
     * @param fields — Array
     */
    id(id: number, fields: MangaFullArray): Promise<Obj>;
    /**
     * List of mangas via a query text search
     * @param q — Text
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    search(q: string, offset?: number, limit?: number, fields?: MangaInListArray): Promise<Obj>;
    /**
     * Ranking mangas, with all type of rankings
     * @param ranking_type — Default "all"
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    ranking(ranking_type?: typeRanking, offset?: number, limit?: number, fields?: MangaInListArray): Promise<Obj>;
}

interface updateList extends baseTypeForList {
    status: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
    is_rereading: boolean;
    num_volumes_read: number;
    num_chapters_read: number;
    num_times_reread: number;
    reread_value: 0 | 1 | 2 | 3 | 4 | 5;
}
declare class userMangaList {
    constructor(access_token: string);
    /**
     * Get list anime from a user
     * @param user_name — Default "@me"
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    getList(user_name?: string, offset?: number, limit?: number, fields?: MangaListArray): Promise<Obj>;
    /**
     * Delete a entry of the user's list.
     * @param {number} manga_id
     */
    deleteList(manga_id: number): Promise<Obj>;
    /**
     * Update a entry of the user's list.
     * @param {number} manga_id
     * @param {object} fieldsToUdpate
     */
    updateList(manga_id: number, fieldsToUdpate: updateList): Promise<Obj>;
}

declare class user {
    constructor(access_token: string);
    /**
     * Get my user information
     * @param {string[]} [fields] Array
     */
    me(fields?: UserArray): Promise<Obj>;
}

declare class oauth2 {
    /**
     * Class to get url authorization & access tokens
     *
     * @param {string} CLIENT_ID {@link https://myanimelist.net/apiconfig/create Get Client ID}
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID: string, CLIENT_SECRET?: string);
    /**
     *
     * @param {number} [length] Optional default is "43"
     * @returns {codepair}
     */
    generatePKCEChallenge(length?: number): codepair;
    /**
     *
     * @param {string} code_verifier Get this from method generatePKCEChallenge
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @returns {boolean}
     */
    verifyPKCEChallenge(code_verifier: string, code_challenge: string): boolean;
    /**
     *
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @param {string} [urlRedirect] Optional if your set only one url redirect from api config
     * @returns {string}
     */
    urlAuthorize(code_challenge: string, urlRedirect?: string): string;
    /**
     *
     * @param {string} code To get code you must access url from method urlAuthorize
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @param {string} urlRedirect If you set url from method urlAuthorize so url must be same
     * @returns
     */
    accessToken(code: string, code_challenge: string, urlRedirect?: string): Promise<Obj>;
    /**
     *
     * @param refresh_token Get this from method accessToken
     * @returns
     */
    refreshToken(refresh_token: string): Promise<Obj>;
}

declare class API {
    #private;
    constructor(ACCESS_TOKEN: string);
    ANIME(): anime;
    USER_ANIME_LIST(): userAnimeList;
    MANGA(): manga;
    USER_MANGA_LIST(): userMangaList;
    USER(): user;
}

declare const _default: {
    API: typeof API;
    OAUTH2: typeof oauth2;
};

export { API, oauth2 as OAUTH2, _default as default };
