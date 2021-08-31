interface codepair {
    code_challenge: string;
    code_verifier: string;
}
type baseTypeForList = {
    score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    priority: 0 | 1 | 2;
    tags: string;
    comments: string;
};
interface Obj {
    [key: string]: any;
}
type AnimeFullArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios" | "pictures" | "background" | "related_anime" | "related_manga" | "recommendations" | "statistics">;
type AnimeInListArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios">;
type AnimeListArray = Array<"status" | "score" | "num_watched_episodes" | "is_rewatching" | "start_date" | "finish_date" | "priority" | "num_times_rewatched" | "rewatch_value" | "tags" | "updated_at" | "id" | "title" | "main_picture" | "alternative_titles" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "media_type" | "my_list_status" | "num_episodes" | "start_season" | "broadcast" | "source" | "average_episode_duration" | "rating" | "studios">;
type MangaFullArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_volumes" | "num_chapters" | "authors" | "pictures" | "background" | "related_anime" | "related_manga" | "recommendations" | "serialization">;
type MangaInListArray = Array<"id" | "title" | "main_picture" | "alternative_titles" | "start_date" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "updated_at" | "media_type" | "status" | "my_list_status" | "num_volumes" | "num_chapters" | "authors">;
type MangaListArray = Array<"status" | "score" | "num_volumes_read" | "num_chapters_read" | "is_rereading" | "start_date" | "finish_date" | "priority" | "num_times_reread" | "reread_value" | "tags" | "updated_at" | "id" | "title" | "main_picture" | "alternative_titles" | "end_date" | "synopsis" | "mean" | "rank" | "popularity" | "num_list_users" | "num_scoring_users" | "nsfw" | "genres" | "created_at" | "media_type" | "my_list_status" | "num_volumes" | "num_chapters" | "authors">;
type UserArray = Array<"id" | "name" | "picture" | "gender" | "birthday" | "location" | "joined_at" | "anime_statistics" | "time_zone" | "is_supporter">;
type animeid = string | number;
type rankingtype = "all" | "airing" | "upcoming" | "tv" | "ova" | "movie" | "special" | "bypopularity" | "favorite";
type season$0 = "winter" | "spring" | "summer" | "fall";
type sort = "anime_score" | "anime_num_list_users" | "";
declare class anime {
    #private;
    constructor(access_token: string);
    /**
     * Specific anime by id, and return the anime with all details
     * @param id — MAL Anime ID
     * @param fields — Array
     */
    // prettier-ignore
    id(id: animeid, fields?: AnimeFullArray): Promise<Obj>;
    /**
     * List of animes via a query text search
     * @param q — Text
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    // prettier-ignore
    search(q: string, offset?: number, limit?: number, fields?: AnimeInListArray): Promise<Obj>;
    /**
     * Ranking animes, with all type of rankings
     * @param ranking_type — string {@link rankingtype ranking_type}
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    // prettier-ignore
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
    // prettier-ignore
    seasonal(year?: number, season?: season$0, offset?: number, limit?: number, sort?: sort, fields?: AnimeInListArray): Promise<Obj>;
    /**
     * Anime suggestion from MAL
     * @param offset — number default 0
     * @param limit — number default 100
     * @param fields — array
     */
    suggestions(offset?: number, limit?: number, fields?: AnimeInListArray): Promise<Obj>;
}
declare module animeWrapper {
    export { anime };
}
import ANIME = animeWrapper.anime;
interface updateList extends baseTypeForList {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    is_rewatching: boolean;
    num_watched_episodes: number;
    num_times_rewatched: number;
    rewatch_value: 0 | 1 | 2 | 3 | 4 | 5;
}
declare class userAnimeList {
    #private;
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
     * @param anime_id
     */
    deleteList(anime_id: number): Promise<Obj>;
    /**
     * Update a entry of the user's list.
     * @param anime_id
     * @param fieldsToUdpate
     */
    updateList(anime_id: number, fieldsToUdpate: updateList): Promise<Obj>;
}
declare module userAnimeListWrapper {
    export { userAnimeList };
}
import ANIME_LIST = userAnimeListWrapper.userAnimeList;
type typeRanking = "all" | "manga" | "novels" | "oneshots" | "doujin" | "manhwa" | "manhua" | "bypopularity" | "favorite";
declare class manga {
    #private;
    constructor(access_token: string);
    /**
     * Specific manga by id, and return the manga with all details
     * @param id — MAL Manga ID
     * @param fields — Array
     */
    id(id: number, fields?: MangaFullArray): Promise<Obj>;
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
    // prettier-ignore
    ranking(ranking_type?: typeRanking, offset?: number, limit?: number, fields?: MangaInListArray): Promise<Obj>;
}
declare module mangaWrapper {
    export { manga };
}
import MANGA = mangaWrapper.manga;
interface updateList$0 extends baseTypeForList {
    status: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
    is_rereading: boolean;
    num_volumes_read: number;
    num_chapters_read: number;
    num_times_reread: number;
    reread_value: 0 | 1 | 2 | 3 | 4 | 5;
}
declare class userMangaList {
    #private;
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
     * @param manga_id
     */
    deleteList(manga_id: number): Promise<Obj>;
    /**
     * Update a entry of the user's list.
     * @param manga_id
     * @param fieldsToUdpate
     */
    updateList(manga_id: number, fieldsToUdpate: updateList$0): Promise<Obj>;
}
declare module userMangaListWrapper {
    export { userMangaList };
}
import MANGA_LIST = userMangaListWrapper.userMangaList;
declare class user {
    #private;
    constructor(access_token: string);
    /**
     * Get my user information
     * @param fields Array
     */
    me(fields?: UserArray): Promise<Obj>;
}
declare module userWrapper {
    export { user };
}
import USER = userWrapper.user;
declare class oauth2 {
    #private;
    /**
     * Class to get url authorization & access tokens
     *
     * @param {string} CLIENT_ID {@link https://myanimelist.net/apiconfig/create Get Client ID}
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID: string, CLIENT_SECRET?: string);
    /**
     *
     * @param length Optional default is "43"
     * @returns
     */
    generatePKCEChallenge(length?: number): codepair;
    /**
     *
     * @param code_verifier Get this from method generatePKCEChallenge
     * @param code_challenge Get this from method generatePKCEChallenge
     * @returns
     */
    verifyPKCEChallenge(code_verifier: string, code_challenge: string): boolean;
    /**
     *
     * @param code_challenge Get this from method generatePKCEChallenge
     * @param urlRedirect Optional if your set only one url redirect from api config
     * @returns
     */
    urlAuthorize(code_challenge: string, urlRedirect?: string): string;
    /**
     *
     * @param code To get code you must access url from method urlAuthorize
     * @param code_challenge Get this from method generatePKCEChallenge
     * @param urlRedirect If you set url from method urlAuthorize so url must be same
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
declare module oauth2Wrapper {
    export { oauth2 };
}
import OAUTH2 = oauth2Wrapper.oauth2;
declare class API {
    #private;
    constructor(ACCESS_TOKEN: string);
    ANIME(): ANIME;
    USER_ANIME_LIST(): ANIME_LIST;
    MANGA(): MANGA;
    USER_MANGA_LIST(): MANGA_LIST;
    USER(): USER;
}
declare const _default: {
    API: typeof API;
    OAUTH2: typeof OAUTH2;
};
export { _default as default, API, OAUTH2 };
