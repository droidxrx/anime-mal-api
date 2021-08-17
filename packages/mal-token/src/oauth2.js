const superagent = require("superagent");
const { pkceChallenge, verifyChallenge } = require("./pkce");

module.exports = class oauth2 {
    #client_id;
    #client_secret;
    #redirect_uri;
    #baseurl = "https://myanimelist.net/v1/oauth2";
    #urlRedirect = `${this.#baseurl}/authorize`;
    #urlToken = `${this.#baseurl}/token`;

    /**
     * @param {string} CLIENT_ID Required
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID, CLIENT_SECRET = undefined) {
        this.#client_id = CLIENT_ID;
        this.#client_secret = CLIENT_SECRET;
    }

    /** Generate a PKCE challenge pair
     * @param {number} [length] Optional Default 43 (Min.43, Max.128)
     * @returns {{code_challenge:string,code_verifier:string}} Object PKCE challenge pair
     */
    generatePKCEChallenge(length = 43) {
        if (length < 43) return console.log("Length Minimal 43");
        else if (length > 128) return console.log("Length Maximal 128");
        return pkceChallenge(length);
    }

    /** Verify that a code_verifier produces the expected code challenge
     * @param {string} CODE_VERIFIER
     * @param {string} CODE_CHALLENGE The code challenge to verify
     * @returns {boolean} True if challenges are equal. False otherwise.
     */
    verifyPKCEChallenge(CODE_VERIFIER, CODE_CHALLENGE) {
        return verifyChallenge(CODE_VERIFIER, CODE_CHALLENGE);
    }

    /** Get Url Client requests OAuth 2.0 authentication
     * @param {string} CODE_CHALLENGE
     * @param {string} [urlRedirect] Optional
     * @returns {string} Url Client requests OAuth 2.0 authentication
     */
    urlAuthorize(CODE_CHALLENGE, urlRedirect) {
        const urlredirect = urlRedirect ? `&redirect_uri=${urlRedirect}` : "";
        this.#redirect_uri = urlRedirect;
        return `${this.#urlRedirect}?response_type=code&client_id=${this.#client_id}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=plain${urlredirect}`;
    }

    /**
     * @param  {string} code To get Code You Must Redirect Url From Method urlAuthorize
     * @param  {string} codeVerifier This CODE_CHALLENGE Get From Method generatePKCEChallenge
     */
    accessToken(code, codeVerifier) {
        const data = { client_id: this.#client_id, client_secret: this.#client_secret, code: code, code_verifier: codeVerifier, grant_type: "authorization_code" };
        this.#redirect_uri && Object.assign(data, { redirect_uri: this.#redirect_uri });
        return new Promise((resolve, reject) => {
            const fet = superagent.post(this.#urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }

    /**
     * @param  {string} refresh_token Get refresh_token From Method accessToken
     */
    refreshToken(refresh_token) {
        const data = { client_id: this.#client_id, client_secret: this.#client_secret, refresh_token: refresh_token, grant_type: "refresh_token" };
        return new Promise((resolve, reject) => {
            const fet = superagent.post(this.#urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
};
