import baseclass from "../baseclass";
import structures from "./structures";
import utils_anime from "./utils";

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

export default class anime extends baseclass {
    private utils = new utils_anime();
    constructor(access_token: string) {
        super(access_token);
    }

    /**
     * Specific anime by id, and return the anime with all details
     * @property id — must number
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L2 animeFull}
     */
    animeId({ id, fields = structures.animeFull }: animeId) {
        return this.get(`/anime/${id}`, { fields: fields.toString() });
    }

    /**
     * List of animes via a query text search
     * @property q — Text
     * @property offset — must number default 0
     * @property limit — must number default 100
     * @property fields — {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSearch({ q, offset = 0, limit = 100, fields = structures.animeInList }: animeSearch) {
        const query = { q, limit, offset, fields: fields.toString() };
        return this.get(`/anime`, query);
    }

    /**
     * Ranking animes, with all type of rankings
     * @property ranking_type — string {@link animeRanking.ranking_type ranking_type}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeRanking({ ranking_type = "all", offset = 0, limit = 100, fields = structures.animeInList }: animeRanking) {
        const query = { ranking_type, limit, offset, fields: fields.toString() };
        return this.get(`/anime/ranking`, query);
    }

    /**
     * Seasonal Anime, by default is filled at actual season
     * @property year — number default Current Year
     * @property season — string default Current Season {@link animeSeasonal.season Click me}
     * @property offset — number default 0
     * @property limit — number default 100
     * @property sort — string default "" {@link animeSeasonal.sort Click me}
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSeasonal({
        year = new Date().getFullYear(),
        season = this.utils.getSeasonForNumberMonth(new Date().getMonth()),
        offset = 0,
        limit = 100,
        sort = "",
        fields = structures.animeInList,
    }: animeSeasonal) {
        const query = { year, season, offset, limit, sort, fields: fields.toString() };
        return this.get(`/anime/season/${year}/${season}`, query);
    }

    /**
     * Anime suggestion from MAL
     * @property offset — number default 0
     * @property limit — number default 100
     * @property fields — array / string {@link https://github.com/droidxrx/anime-mal-api/blob/master/src/api/anime/structures.ts#L36 animeInList}
     */
    animeSuggestions(offset = 0, limit = 100, fields = structures.animeInList) {
        const query = { offset, limit, fields: fields.toString() };
        return this.get("/anime/suggestions", query);
    }
}
