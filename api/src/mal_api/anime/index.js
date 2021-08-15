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
     */
    animeid(id, fields) {
        const field = fields || structures.animeFull;
        return get(this.#token, `anime/${id}`, field);
    }
    animeSearch() {}
    animeRanking() {}
    animeSeasonal() {}
    animeSuggestions() {}
};
