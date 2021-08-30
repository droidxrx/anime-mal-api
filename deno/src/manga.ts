import { httpApi, Obj } from "./utils.ts";
import { MangaFullArray, MangaInListArray, MangaFull, MangaInList } from "./structures.ts";

type typeRanking = "all" | "manga" | "novels" | "oneshots" | "doujin" | "manhwa" | "manhua" | "bypopularity" | "favorite";

export default class manga {
    #token: string;
    constructor(access_token: string) {
        this.#token = access_token;
    }

    /**
     * Specific manga by id, and return the manga with all details
     * @param id — MAL Manga ID
     * @param fields — Array
     */
    id(id: number, fields: MangaFullArray = MangaFull): Promise<Obj> {
        fields = fields ? fields : MangaFull;
        return httpApi(this.#token, `/manga/${id}`, "get", { fields });
    }

    /**
     * List of mangas via a query text search
     * @param q — Text
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    search(q: string, offset: number = 0, limit: number = 100, fields: MangaInListArray = MangaInList): Promise<Obj> {
        fields = fields ? fields : MangaInList;
        return httpApi(this.#token, "/manga", "get", { q, limit, offset, fields });
    }

    /**
     * Ranking mangas, with all type of rankings
     * @param ranking_type — Default "all"
     * @param offset — Default 0
     * @param limit — Default 100
     * @param fields — Array
     */
    // prettier-ignore
    ranking(ranking_type: typeRanking = "all", offset: number = 0, limit: number = 100, fields: MangaInListArray = MangaInList): Promise<Obj> {
        fields = fields ? fields : MangaInList;
        return httpApi(this.#token, "/manga/ranking", "get", { ranking_type, limit, offset, fields });
    }
}
