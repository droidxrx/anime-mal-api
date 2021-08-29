import { opine } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std@0.106.0/path/mod.ts";
import * as router from "./router/router.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const fileJson = join(__dirname, "database.json");

const oauth2Router = { CLIENT_ID: "YOUT_CLIENT_ID", fileJson, urlRedirect: "http://localhost:8080/oauth2" };

const app = opine();
app.use("/oauth2", router.oauth2(oauth2Router));
app.use("/anime", router.anime(fileJson));
app.use("/manga", router.manga(fileJson));
app.use("/user", router.user(fileJson));
app.use("/user-anime-list", router.userAnimeList(fileJson));
app.use("/user-manga-list", router.userMangaList(fileJson));
app.listen(8080, () => console.log("server has started on http://localhost:8080 🚀"));
