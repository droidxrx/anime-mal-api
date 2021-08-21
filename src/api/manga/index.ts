import baseclass from "../baseclass";
import structures from "./structures";

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
    ranking_type?:
        | "all"
        | "manga"
        | "novels"
        | "oneshots"
        | "doujin"
        | "manhwa"
        | "manhua"
        | "bypopularity"
        | "favorite";
    offset?: number;
    limit?: number;
    fields?: string[] | string;
};

export default class manga extends baseclass {
    constructor(access_token: string) {
        super(access_token);
    }

    /**
     * Specific manga by id, and return the manga with all details
     * @property id — must number
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L2 mangaFull}
     */
    mangaId({ id, fields = structures.mangaFull }: mangaId) {
        const query = { fields: fields.toString() };
        return this.get(`/manga/${id}`, query);
    }

    /**
     * List of mangas via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L32 mangaInList}
     */
    mangaSearch({ q, offset = 0, limit = 100, fields = structures.mangaInList }: mangaSearch) {
        const query = { q, limit, offset, fields: fields.toString() };
        return this.get("/manga", query);
    }

    /**
     * Ranking mangas, with all type of rankings
     * @property ranking_type — string {@link mangaRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/manga/structures.ts#L32 mangaInList}
     */
    mangaRanking({ ranking_type = "all", offset = 0, limit = 100, fields = structures.mangaInList }: mangaRanking) {
        const query = { ranking_type, limit, offset, fields: fields.toString() };
        return this.get("/manga/ranking", query);
    }
}