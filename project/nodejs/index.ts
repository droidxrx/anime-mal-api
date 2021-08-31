import ANIME from "./src/anime";
import ANIME_LIST from "./src/userAnimeList";
import MANGA from "./src/manga";
import MANGA_LIST from "./src/userMangaList";
import USER from "./src/user";
import OAUTH2 from "./src/oauth2";
class API {
    #token: string;
    constructor(ACCESS_TOKEN: string) {
        this.#token = ACCESS_TOKEN;
    }

    ANIME(): ANIME {
        if (!this.#token) throw new Error("Please insert Access Token");
        return new ANIME(this.#token);
    }
    USER_ANIME_LIST(): ANIME_LIST {
        if (!this.#token) throw new Error("Please insert Access Token");
        return new ANIME_LIST(this.#token);
    }
    MANGA(): MANGA {
        if (!this.#token) throw new Error("Please insert Access Token");
        return new MANGA(this.#token);
    }
    USER_MANGA_LIST(): MANGA_LIST {
        if (!this.#token) throw new Error("Please insert Access Token");
        return new MANGA_LIST(this.#token);
    }
    USER(): USER {
        if (!this.#token) throw new Error("Please insert Access Token");
        return new USER(this.#token);
    }
}

export { API, OAUTH2 };
export default { API, OAUTH2 };
