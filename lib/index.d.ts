export class MAL_OAUTH2 {
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
declare class baseclass {
    constructor(access_token: string);
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
export class MAL_API_ANIME extends baseclass {
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
    animeSeasonal({ year, season, offset, limit, sort, fields, }: animeSeasonal): Promise<object>;
    /**
     * Anime suggestion from MAL
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSuggestions(offset?: number, limit?: number, fields?: string[]): Promise<object>;
}
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
export class MAL_API_ANIME_LIST extends baseclass {
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
export class MAL_API_MANGA extends baseclass {
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
type _getList1 = {
    user_name?: string;
    offset?: number;
    limit?: number;
    fields?: string[];
};
type _updateList1 = {
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
export class MAL_API_MANGA_LIST extends baseclass {
    constructor(access_token: string);
    /**
     * Get list anime from a user
     * @property user_name — string default "@me"
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga-list/structures.ts click me}
     */
    _getList1({ user_name, offset, limit, fields }: _getList1): Promise<object>;
    /**
     * Delete a entry of the user's list.
     */
    deleteList(manga_id: number): Promise<object>;
    /**
     * Update a entry of the user's list.
     * @param  {number} anime_id
     * @param  {object} fieldsToUdpate {@link updateList click me}
     */
    _updateList1(anime_id: number, fieldsToUdpate: _updateList1): Promise<object>;
}
type me = string[] | string;
export class MAL_API_USER extends baseclass {
    constructor(access_token: string);
    /**
     * Get my user information
     * @param {string[] | string} [fields] {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/user/structures.ts click me}
     */
    me(fields?: me): Promise<object>;
}
