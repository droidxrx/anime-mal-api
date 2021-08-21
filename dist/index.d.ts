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
    get(params: string): import("superagent").SuperAgentRequest;
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
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.ts animeFull}
     */
    animeId({ id, fields }: animeId): Promise<object>;
    /**
     * List of animes via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.ts animeInList}
     */
    animeSearch({ q, offset, limit, fields, }: animeSearch): Promise<object>;
    /**
     * Ranking animes, with all type of rankings
     * @property ranking_type — string {@link animeRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.ts animeInList}
     */
    animeRanking({ ranking_type, offset, limit, fields, }: animeRanking): Promise<object>;
    /**
     * Seasonal Anime, by default is filled at actual season
     * @property year — number default Current Year
     * @property season — string default Current Season {@link animeSeasonal.season Click me}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property sort — string default "" {@link animeSeasonal.sort Click me}
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.ts animeInList}
     */
    animeSeasonal({ year, season, offset, limit, sort, fields, }: animeSeasonal): Promise<object>;
    /**
     * Anime suggestion from MAL
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.ts animeInList}
     */
    animeSuggestions(offset?: number, limit?: number, fields?: string[]): Promise<object>;
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
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/manga/structures.ts mangaFull}
     */
    mangaId({ id, fields }: mangaId): Promise<object>;
    /**
     * List of mangas via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/manga/structures.ts mangaInList}
     */
    mangaSearch({ q, offset, limit, fields, }: mangaSearch): Promise<object>;
    /**
     * Ranking mangas, with all type of rankings
     * @property ranking_type — string {@link mangaRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/manga/structures.ts mangaInList}
     */
    mangaRanking({ ranking_type, offset, limit, fields, }: mangaRanking): Promise<object>;
}
