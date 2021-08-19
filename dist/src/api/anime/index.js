Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = require("../baseclass");
const structures_json_1 = require("./structures.json");
class anime extends baseclass_1.default {
    constructor(access_token) {
        super(access_token);
    }
    animeId({ id, fields = structures_json_1.animeFull }) {
        return new Promise((resolve, reject) => {
            this.get(`/anime/${id}`)
                .query({ fields: fields.toString() })
                .then((response) => resolve(Object.assign({ status: true }, response.body)))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
    animeSearch({ q, offset = 0, limit = 100, fields = structures_json_1.animeInList }) {
        return new Promise((resolve, reject) => {
            this.get("/anime")
                .query({ q, limit, offset, fields: fields.toString() })
                .then((response) => resolve(Object.assign({ status: true }, response.body)))
                .catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
        });
    }
}
exports.default = anime;
