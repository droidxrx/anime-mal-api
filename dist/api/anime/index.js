var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass"));
const structures_json_1 = __importDefault(require("./structures.json"));
class anime extends baseclass_1.default {
    constructor(access_token) {
        super(access_token);
    }
    /**
     * @see {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.json Click me to show all list for fields}
     */
    animeId({ id, fields = structures_json_1.default.animeFull }) {
        return new Promise((resolve, reject) => {
            this.get(`/anime/${id}`)
                .query({ fields: fields.toString() })
                .then((response) => resolve({ status: true, result: response.body }))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
    /**
     * @see {@link https://github.com/droidxrx/anime-mal-api/blob/master/typescript/src/api/anime/structures.json Click me to show all list for fields}
     */
    animeSearch({ q, offset = 0, limit = 100, fields = structures_json_1.default.animeInList }) {
        return new Promise((resolve, reject) => {
            this.get("/anime")
                .query({ q, limit, offset, fields: fields.toString() })
                .then((response) => resolve({ status: true, result: response.body }))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
}
exports.default = anime;
