import { post } from "superagent";
import { pkceChallenge, verifyChallenge } from "./pkce";

export default class oauth2 {
    private client_id: string;
    private client_secret: string;
    private redirect_uri: string;
    private baseurl = "https://myanimelist.net/v1/oauth2";
    private urlRedirect = `${this.baseurl}/authorize`;
    private urlToken = `${this.baseurl}/token`;

    constructor(CLIENT_ID: string, CLIENT_SECRET: string = undefined) {
        this.client_id = CLIENT_ID;
        this.client_secret = CLIENT_SECRET;
    }

    generatePKCEChallenge(length: number = 43) {
        if (length < 43) return console.log("Length Minimal 43");
        else if (length > 128) return console.log("Length Maximal 128");
        return pkceChallenge(length);
    }
    
    verifyPKCEChallenge(CODE_VERIFIER: string, CODE_CHALLENGE: string) {
        return verifyChallenge(CODE_VERIFIER, CODE_CHALLENGE);
    }

    urlAuthorize(CODE_CHALLENGE: string, urlRedirect: string) {
        const urlredirect = urlRedirect ? `&redirect_uri=${urlRedirect}` : "";
        this.redirect_uri = urlRedirect;
        return `${this.urlRedirect}?response_type=code&client_id=${this.client_id}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=plain${urlredirect}`;
    }

    accessToken(code: string, codeVerifier: string): Promise<object> {
        const data = { client_id: this.client_id, client_secret: this.client_secret, code: code, code_verifier: codeVerifier, grant_type: "authorization_code" };
        this.redirect_uri && Object.assign(data, { redirect_uri: this.redirect_uri });
        return new Promise((resolve, reject) => {
            const fet = post(this.urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }

    refreshToken(refresh_token: string): Promise<object> {
        const data = { client_id: this.client_id, client_secret: this.client_secret, refresh_token: refresh_token, grant_type: "refresh_token" };
        return new Promise((resolve, reject) => {
            const fet = post(this.urlToken).send(data).type("application/x-www-form-urlencoded");
            fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
        });
    }
}
