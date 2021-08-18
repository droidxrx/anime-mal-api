const baseclass = require("../baseclass");
const structures = require("./structures.json");

module.exports = class anime extends baseclass {
    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super(access_token);
    }

    /**
     * Specific anime by id, and return the anime with all details
     * @param {Object} object
     * @param  {Number} object.id
     * @param {Array<string>|string} [object.fields] See me {@link structures.animeFull}
     * @returns {Promise<object>}
     */
    animeId({ id, fields = structures.animeFull }) {
        return new Promise((resolve, reject) => {
            this.http(`/anime/${id}`)
                .query({ fields: fields.toString() })
                .then((response) => resolve(response.body))
                .catch((error) => reject(JSON.parse(error.response.text)));
        });
    }

    /**
     * List of animes via a query text search
     * @param {Object} object
     * @param  {String} object.q Search Query Minimal 3 Digits
     * @param  {Number} [object.offset] Default 0
     * @param  {Number} [object.limit] Default 100
     * @param {Array<string> | string} [object.fields] See me {@link structures.animeInList}
     * @returns {Promise<object>}
     */
    animeSearch({ q, offset = 0, limit = 100, fields = structures.animeInList }) {
        return new Promise((resolve, reject) => {
            this.http("/anime")
                .query({ q, limit, offset, fields: fields.toString() })
                .then((response) => resolve(response.body))
                .catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
};
