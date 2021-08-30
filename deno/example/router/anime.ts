import { Router } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { API } from "../../mod.ts";

export function anime(fileJson: string) {
    const router = Router();
    return router.get("/:path?", function (req, res) {
        const {
            params: { path },
            query: { q, offset, limit, fields, ranking_type, year, season, sort },
        } = req;
        const { access_token }: any = readJsonSync(fileJson);
        const anime = new API(access_token).ANIME();

        // anime search query
        if (!path) anime.search(q, offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        // anime id
        else if (!isNaN(+path)) anime.id(+path, fields?.split(",")).then((resp) => res.json(resp));
        // anime rangking
        else if (path === "ranking") anime.ranking(ranking_type, offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        // anime seasonal
        else if (path === "seasonal") anime.seasonal(year, season, offset, limit, sort, fields?.split(",")).then((resp) => res.json(resp));
        // anime suggestions
        else if (path === "suggestions") anime.suggestions(offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        else res.json({ status: false, error: "Invalid params" });
    });
}
