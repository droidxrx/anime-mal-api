const { fetToken } = require("./fetchs");

const pkceChallenge = require("./pkce-challenge");
module.exports = class oauth2 {
    #client_id;
    #client_secret;
    /**
     * @param {string} CLIENT_ID Required
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID, CLIENT_SECRET = undefined) {
        this.#client_id = CLIENT_ID;
        this.#client_secret = CLIENT_SECRET;
    }

    /** Generate a PKCE challenge pair
     * @returns {{code_challenge:string,code_verifier:string}} PKCE challenge pair
     */
    generatePKCEChallenge() {
        return pkceChallenge();
    }

    /** Get Url Client requests OAuth 2.0 authentication
     * @param {string} CODE_CHALLENGE
     * @returns {string} Url Client requests OAuth 2.0 authentication
     */
    urlAuthorize(CODE_CHALLENGE) {
        return `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${this.#client_id}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=plain`;
    }

    /**
     * @param  {String} code To get Code You Must Redirect Url From Methon urlAuthorize
     * @param  {String} codeVerifier This CODE_CHALLENGE Get From Methon generatePKCEChallenge
     */
    accessToken(code, codeVerifier) {
        const query = {
            url: "https://myanimelist.net/v1/oauth2/token",
            params: { client_id: this.#client_id, client_secret: this.#client_secret, code: code, code_verifier: codeVerifier, grant_type: "authorization_code" },
        };
        return fetToken(query);
    }

    /**
     * @param  {String} refresh_token Get refresh_token From Methon accessToken
     */
    refreshToken(refresh_token) {
        const query = {
            url: "https://myanimelist.net/v1/oauth2/token",
            params: { client_id: this.#client_id, client_secret: this.#client_secret, refresh_token: refresh_token, grant_type: "refresh_token" },
        };
        return fetToken(query);
    }
};
