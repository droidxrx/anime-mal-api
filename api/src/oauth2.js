const { token } = require("./fetchs");
const pkceChallenge = require("./pkce-challenge");

module.exports = class oauth2 {
    #client_id;
    #client_secret;
    #redirect_uri;
    /**
     * @param {string} CLIENT_ID Required
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID, CLIENT_SECRET = undefined) {
        this.#client_id = CLIENT_ID;
        this.#client_secret = CLIENT_SECRET;
        this.#redirect_uri;
    }

    /** Generate a PKCE challenge pair
     * @returns {{code_challenge:string,code_verifier:string}} PKCE challenge pair
     */
    generatePKCEChallenge() {
        return pkceChallenge();
    }

    /** Get Url Client requests OAuth 2.0 authentication
     * @param {string} CODE_CHALLENGE
     * @param {string} [urlRedirect] Optional
     * @returns {string} Url Client requests OAuth 2.0 authentication
     */
    urlAuthorize(CODE_CHALLENGE, urlRedirect) {
        const urlredirect = urlRedirect ? `&redirect_uri=${urlRedirect}` : "";
        this.#redirect_uri = urlRedirect;
        return `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${this.#client_id}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=plain${urlredirect}`;
    }

    /**
     * @param  {String} code To get Code You Must Redirect Url From Method urlAuthorize
     * @param  {String} codeVerifier This CODE_CHALLENGE Get From Method generatePKCEChallenge
     */
    accessToken(code, codeVerifier) {
        const data = { client_id: this.#client_id, client_secret: this.#client_secret, code: code, code_verifier: codeVerifier, grant_type: "authorization_code" };
        this.#redirect_uri && Object.assign(data, { redirect_uri: this.#redirect_uri });
        return token(data);
    }

    /**
     * @param  {String} refresh_token Get refresh_token From Method accessToken
     */
    refreshToken(refresh_token) {
        const data = { client_id: this.#client_id, client_secret: this.#client_secret, refresh_token: refresh_token, grant_type: "refresh_token" };
        return token(data);
    }
};
