Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = require("superagent");
const pkce_1 = require("./pkce");
class oauth2 {
    constructor(CLIENT_ID, CLIENT_SECRET = undefined) {
        this.baseurl = "https://myanimelist.net/v1/oauth2";
        this.urlRedirect = `${this.baseurl}/authorize`;
        this.urlToken = `${this.baseurl}/token`;
        this.client_id = CLIENT_ID;
        this.client_secret = CLIENT_SECRET;
    }
    /**
     * @param {number} length Optional default 43 (Min.43, Max 128)
     */
    generatePKCEChallenge(length = 43) {
        if (length < 43)
            return console.log("Length Minimal 43");
        else if (length > 128)
            return console.log("Length Maximal 128");
        return pkce_1.pkceChallenge(length);
    }
    verifyPKCEChallenge(CODE_VERIFIER, CODE_CHALLENGE) {
        return pkce_1.verifyChallenge(CODE_VERIFIER, CODE_CHALLENGE);
    }
    urlAuthorize(CODE_CHALLENGE, urlRedirect) {
        const urlredirect = urlRedirect ? `&redirect_uri=${urlRedirect}` : "";
        this.redirect_uri = urlRedirect;
        return `${this.urlRedirect}?response_type=code&client_id=${this.client_id}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=plain${urlredirect}`;
    }
    accessToken(code, codeVerifier) {
        const data = { client_id: this.client_id, client_secret: this.client_secret, code: code, code_verifier: codeVerifier, grant_type: "authorization_code" };
        this.redirect_uri && Object.assign(data, { redirect_uri: this.redirect_uri });
        return new Promise((resolve, reject) => {
            const fet = superagent_1.post(this.urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
    refreshToken(refresh_token) {
        const data = { client_id: this.client_id, client_secret: this.client_secret, refresh_token: refresh_token, grant_type: "refresh_token" };
        return new Promise((resolve, reject) => {
            const fet = superagent_1.post(this.urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
}
exports.default = oauth2;
