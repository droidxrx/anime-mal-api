import { Router } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { API } from "../../mod.ts";
export function manga(fileJson: string) {
    const router = Router();
    return router.get("/:path?", function (req, res) {
        const {
            params: { path },
            query: { q, offset, limit, fields, ranking_type },
        } = req;
        const { access_token }: any = readJsonSync(fileJson);
        const manga = new API(access_token).MANGA();

        // manga search query
        if (!path) manga.search(q, offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        // manga id
        else if (!isNaN(+path)) manga.id(+path, fields?.split(",")).then((resp) => res.json(resp));
        // anime rangking
        else if (path === "ranking") manga.ranking(ranking_type, offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        else res.json({ status: false, error: "Invalid params" });
    });
}
