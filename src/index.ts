import MAL_OAUTH2 from "./oauth2";
import MAL_API_ANIME from "./api/anime";
import MAL_API_MANGA from "./api/manga";

if (window) {
    window["MAL_API"] = {
        OAUTH2: MAL_OAUTH2,
        ANIME: MAL_API_ANIME,
        MANGA: MAL_API_MANGA,
    };
}

export { MAL_OAUTH2, MAL_API_ANIME, MAL_API_MANGA };
