import baseclass from "../baseclass";
import structures from "./structures.json";

export default class anime extends baseclass {
    constructor(access_token: string) {
        super(access_token);
    }

    /**
     * @see {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.json Click me to show all list for fields}
     */
    animeId({ id, fields = structures.animeFull }: { id: number; fields?: string[] | string }): Promise<object> {
        return new Promise((resolve, reject) => {
            this.get(`/anime/${id}`)
                .query({ fields: fields.toString() })
                .then((response) => resolve(Object.assign({ status: true }, response.body)))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
    /**
     * @see {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.json Click me to show all list for fields}
     */
    animeSearch({ q, offset = 0, limit = 100, fields = structures.animeInList }: { q: any; offset?: number; limit?: number; fields?: string[] | string }): Promise<object> {
        return new Promise((resolve, reject) => {
            this.get("/anime")
                .query({ q, limit, offset, fields: fields.toString() })
                .then((response) => resolve(Object.assign({ status: true }, response.body)))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
}
