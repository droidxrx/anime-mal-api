import { Router } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { API } from "../../mod.ts";
export function userMangaList(fileJson: string) {
    const router = Router();
    return router.get("/:path?/:id?", function (req, res) {
        const {
            params: { path, id },
            query: { user_name, offset, limit, fields },
            query: query,
        } = req;
        const { access_token }: any = readJsonSync(fileJson);
        const userAnimeList = new API(access_token).USER_MANGA_LIST();

        // Get List Anime
        if (!path) userAnimeList.getList(user_name, offset, limit, fields?.split(",")).then((resp) => res.json(resp));
        // Delete List Anime
        else if (path === "delete" && !isNaN(+id)) userAnimeList.deleteList(+id).then((resp) => res.json(resp));
        // Update List Anime
        else if (path === "update" && !isNaN(+id)) userAnimeList.updateList(+id, query).then((resp) => res.json(resp));
        else res.json({ status: false, error: "Invalid params" });
    });
}
