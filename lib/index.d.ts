declare class oauth2 {
    private client_id;
    private client_secret;
    private redirect_uri;
    private baseurl;
    private urlRedirect;
    private urlToken;
    constructor(CLIENT_ID: string, CLIENT_SECRET?: string);
    generatePKCEChallenge(length?: number): void | {
        code_challenge: string;
        code_verifier: string;
    };
    verifyPKCEChallenge(CODE_VERIFIER: string, CODE_CHALLENGE: string): boolean;
    urlAuthorize(CODE_CHALLENGE: string, urlRedirect: string): string;
    accessToken(code: string, codeVerifier: string): Promise<object>;
    refreshToken(refresh_token: string): Promise<object>;
}
declare module oauth2Wrapper {
    export { oauth2 };
}
import MAL_OAUTH2 = oauth2Wrapper.oauth2;
declare class baseclass {
    private urlBase;
    private token;
    private agent;
    constructor(access_token: string);
    private callback;
    get(params: string, query: object): Promise<object>;
    del(animeOrManga: string, id: number): Promise<object>;
    put(animeOrManga: string, id: number, query: object): Promise<object>;
}
type animeId = {
    id: number;
    fields?: string[] | string;
};
type animeSearch = {
    q: any;
    offset?: number;
    limit?: number;
    fields?: string[] | string;
};
type animeRanking = {
    ranking_type?: "all" | "airing" | "upcoming" | "tv" | "ova" | "movie" | "special" | "bypopularity" | "favorite";
    offset?: number;
    limit?: number;
    fields?: string[] | string;
};
type animeSeasonal = {
    year?: number;
    season?: "winter" | "spring" | "summer" | "fall";
    offset?: number;
    limit?: number;
    sort?: "anime_score" | "anime_num_list_users" | "";
    fields?: string[] | string;
};
declare class anime extends baseclass {
    private utils;
    constructor(access_token: string);
    /**
     * Specific anime by id, and return the anime with all details
     * @property id — must number
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L2 animeFull}
     */
    animeId({ id, fields }: animeId): Promise<object>;
    /**
     * List of animes via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSearch({ q, offset, limit, fields }: animeSearch): Promise<object>;
    /**
     * Ranking animes, with all type of rankings
     * @property ranking_type — string {@link animeRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeRanking({ ranking_type, offset, limit, fields }: animeRanking): Promise<object>;
    /**
     * Seasonal Anime, by default is filled at actual season
     * @property year — number default Current Year
     * @property season — string default Current Season {@link animeSeasonal.season Click me}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property sort — string default "" {@link animeSeasonal.sort Click me}
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSeasonal({ year, season, offset, limit, sort, fields }: animeSeasonal): Promise<object>;
    /**
     * Anime suggestion from MAL
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSuggestions(offset?: number, limit?: number, fields?: string[]): Promise<object>;
}
declare module animeWrapper {
    export { anime };
}
import MAL_API_ANIME = animeWrapper.anime;
type getList = {
    user_name?: string;
    offset?: number;
    limit?: number;
    fields?: string[];
};
type updateList = {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    is_rewatching: boolean;
    score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    num_watched_episodes: number;
    priority: 0 | 1 | 2;
    num_times_rewatched: number;
    rewatch_value: 0 | 1 | 2 | 3 | 4 | 5;
    tags: string;
    comments: string;
};
declare class anime_list extends baseclass {
    constructor(access_token: string);
    /**
     * Get list anime from a user
     * @property user_name — string default "@me"
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime-list/structures.ts click me}
     */
    getList({ user_name, offset, limit, fields }: getList): Promise<object>;
    /**
     * Delete a entry of the user's list.
     */
    deleteList(anime_id: number): Promise<object>;
    /**
     * Update a entry of the user's list.
     * @param  {number} anime_id
     * @param  {object} fieldsToUdpate {@link updateList click me}
     */
    updateList(anime_id: number, fieldsToUdpate: updateList): Promise<object>;
}
declare module anime_listWrapper {
    export { anime_list };
}
import MAL_API_ANIME_LIST = anime_listWrapper.anime_list;
type mangaId = {
    id: number;
    fields?: string[] | string;
};
type mangaSearch = {
    q: any;
    offset?: number;
    limit?: number;
    fields?: string[] | string;
};
type mangaRanking = {
    ranking_type?: "all" | "manga" | "novels" | "oneshots" | "doujin" | "manhwa" | "manhua" | "bypopularity" | "favorite";
    offset?: number;
    limit?: number;
    fields?: string[] | string;
};
declare class manga extends baseclass {
    constructor(access_token: string);
    /**
     * Specific manga by id, and return the manga with all details
     * @property id — must number
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L2 mangaFull}
     */
    mangaId({ id, fields }: mangaId): Promise<object>;
    /**
     * List of mangas via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L32 mangaInList}
     */
    mangaSearch({ q, offset, limit, fields }: mangaSearch): Promise<object>;
    /**
     * Ranking mangas, with all type of rankings
     * @property ranking_type — string {@link mangaRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L32 mangaInList}
     */
    mangaRanking({ ranking_type, offset, limit, fields }: mangaRanking): Promise<object>;
}
declare module mangaWrapper {
    export { manga };
}
import MAL_API_MANGA = mangaWrapper.manga;
type getList$0 = {
    user_name?: string;
    offset?: number;
    limit?: number;
    fields?: string[];
};
type updateList$0 = {
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
declare class manga_list extends baseclass {
    constructor(access_token: string);
    /**
     * Get list anime from a user
     * @property user_name — string default "@me"
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga-list/structures.ts click me}
     */
    getList({ user_name, offset, limit, fields }: getList$0): Promise<object>;
    /**
     * Delete a entry of the user's list.
     */
    deleteList(manga_id: number): Promise<object>;
    /**
     * Update a entry of the user's list.
     * @param  {number} anime_id
     * @param  {object} fieldsToUdpate {@link updateList click me}
     */
    updateList(anime_id: number, fieldsToUdpate: updateList$0): Promise<object>;
}
declare module manga_listWrapper {
    export { manga_list };
}
import MAL_API_MANGA_LIST = manga_listWrapper.manga_list;
type me = string[] | string;
declare class user extends baseclass {
    constructor(access_token: string);
    /**
     * Get my user information
     * @param {string[] | string} [fields] {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/user/structures.ts click me}
     */
    me(fields?: me): Promise<object>;
}
declare module userWrapper {
    export { user };
}
import MAL_API_USER = userWrapper.user;
export { MAL_OAUTH2, MAL_API_ANIME, MAL_API_ANIME_LIST, MAL_API_MANGA, MAL_API_MANGA_LIST, MAL_API_USER };
