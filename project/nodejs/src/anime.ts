import { httpApi, MonthIsValid, getSeasonForNumberMonth, Obj } from "./utils";
import { AnimeFullArray, AnimeInListArray, AnimeFull, AnimeInList } from "./structures";

type animeid = string | number;
type rankingtype = "all" | "airing" | "upcoming" | "tv" | "ova" | "movie" | "special" | "bypopularity" | "favorite";
type season = "winter" | "spring" | "summer" | "fall";
type sort = "anime_score" | "anime_num_list_users" | "";

export default class anime {
    #token: string;
    constructor(access_token: string) {
        this.#token = access_token;
    }
    /**
     * Specific anime by id, and return the anime with all details
     * @param id — MAL Anime ID
     * @param fields — Array
     */
    // prettier-ignore
    id(id: animeid, fields: AnimeFullArray = AnimeFull): Promise<Obj> {
        fields = fields ? fields : AnimeFull
        return httpApi(this.#token, `/anime/${id}`, "get", { fields });
    }

    /**
     * List of animes via a query text search
     * @param q — Text
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    // prettier-ignore
    search(q: string, offset = 0, limit = 100, fields: AnimeInListArray = AnimeInList): Promise<Obj> {
        fields = fields ? fields : AnimeInList
        return httpApi(this.#token, "/anime", "get", { q, limit, offset, fields });
    }

    /**
     * Ranking animes, with all type of rankings
     * @param ranking_type — string {@link rankingtype ranking_type}
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    // prettier-ignore
    ranking(ranking_type: rankingtype = "all", offset = 0, limit = 100, fields: AnimeInListArray = AnimeInList): Promise<Obj> {
        fields = fields ? fields : AnimeInList
        return httpApi(this.#token, `/anime/ranking`, "get", { ranking_type, limit, offset, fields });
    }

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
    seasonal(year: number = new Date().getFullYear(), season: season = getSeasonForNumberMonth(new Date().getMonth()), offset = 0, limit = 100, sort: sort = "", fields: AnimeInListArray = AnimeInList): Promise<Obj> {
        const ifseasonincorect = {status: false, return: { error: "Enter a valid season: winter, spring, summer, fall" }}
        fields = fields ? fields : AnimeInList;
        if (MonthIsValid(season)) return httpApi(this.#token, `/anime/season/${year}/${season}`, "get", { year, season, offset, limit, sort, fields });
        else return new Promise(function(resolve, reject) {resolve(ifseasonincorect); reject(ifseasonincorect)})
    }

    /**
     * Anime suggestion from MAL
     * @param offset — number default 0
     * @param limit — number default 100
     * @param fields — array
     */
    suggestions(offset = 0, limit = 100, fields: AnimeInListArray = AnimeInList): Promise<Obj> {
        fields = fields ? fields : AnimeInList;
        return httpApi(this.#token, "/anime/suggestions", "get", { offset, limit, fields });
    }
}
