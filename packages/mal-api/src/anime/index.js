const baseclass = require("../baseclass");
const structures = require("./structures.json");

module.exports = class anime extends baseclass {
    constructor(access_token) {
        super(access_token);
    }

    /**
     * Specific anime by id, and return the anime with all details
     * @param  {Number} id
     * @param {Array<string>} fields See me {@link structures.animeFull}
     * @returns {Promise<object>}
     */
    animeid(id, fields = structures.animeFull) {
        return new Promise((resolve, reject) => {
            this.http(`/anime/${id}`)
                .query({ fields: fields.toString() })
                .then((response) => resolve(response.body))
                .catch((error) => reject(JSON.parse(error.response.text)));
        });
    }

    /**
     * List of animes via a query text search
     * @param  {String} q Search Query Minimal 3 Digits
     * @param  {Number} offset Default 0
     * @param  {Number} limit Default 100
     * @param {Array<string>} fields See me {@link structures.animeInList}
     * @returns {Promise<object>}
     */
    animeSearch(q, offset = 0, limit = 100, fields = structures.animeInList) {
        return new Promise((resolve, reject) => {
            this.http("/anime")
                .query({ q, limit, offset, fields: fields.toString() })
                .then((response) => resolve(response.body))
                .catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
};
