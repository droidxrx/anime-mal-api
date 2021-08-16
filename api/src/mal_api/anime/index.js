const { get } = require("../../fetchs");
const structures = require("./structures.json");

module.exports = class anime {
    #token;
    constructor(access_token) {
        this.#token = access_token;
    }

    /**
     * Specific anime by id, and return the anime with all details
     * @param  {Number} id
     * @param {Array<string>} fields See me {@link structures.animeFull}
     * @returns {Promise<object>} Object
     */
    animeid(id, fields) {
        const field = fields || structures.animeFull;
        return get(this.#token, `anime/${id}`, { fields: field.toString() });
    }

    /**
     * List of animes via a query text search
     * @param  {String} q Search Query Minimal 3 Digits
     * @param  {Number} offset Default 0
     * @param  {Number} limit Default 100
     * @param {Array<string>} fields See me {@link structures.animeInList}
     * @returns {Promise<object>} Object
     */
    animeSearch(q, offset, limit, fields) {
        const field = fields || structures.animeInList;
        const query = {
            q: q,
            offset: offset || 0,
            limit: limit || 100,
            fields: field.toString(),
        };
        return get(this.#token, "anime", query);
    }
    animeRanking() {}
    animeSeasonal() {}
    animeSuggestions() {}
};
