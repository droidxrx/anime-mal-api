import MAL_OAUTH2 from "./oauth2";
import MAL_API_ANIME from "./api/anime";

if (window) window["MAL_API"] = { MAL_OAUTH2, MAL_API_ANIME };

export { MAL_OAUTH2, MAL_API_ANIME };
