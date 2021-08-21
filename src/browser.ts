import MAL_OAUTH2 from "./oauth2";
import MAL_API_ANIME from "./api/anime";
import MAL_API_ANIME_LIST from "./api/anime-list";
import MAL_API_MANGA from "./api/manga";
import MAL_API_MANGA_LIST from "./api/manga-list";
import MAL_API_USER from "./api/user";

window["MAL_API"] = {
    OAUTH2: MAL_OAUTH2,
    ANIME: MAL_API_ANIME,
    ANIME_LIST: MAL_API_ANIME_LIST,
    MANGA: MAL_API_MANGA,
    MANGA_LIST: MAL_API_MANGA_LIST,
    USER: MAL_API_USER,
};
