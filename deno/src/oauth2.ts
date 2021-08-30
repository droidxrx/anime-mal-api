import { httpOauth2, redirectURL, codepair, Obj, pkcegenerate, pkcecreateChallenge } from "./utils.ts";

export default class oauth2 {
    #client_id: string;
    #client_secret?: string;

    /**
     * Class to get url authorization & access tokens
     *
     * @param {string} CLIENT_ID {@link https://myanimelist.net/apiconfig/create Get Client ID}
     * @param {string} [CLIENT_SECRET] Optional
     */
    constructor(CLIENT_ID: string, CLIENT_SECRET?: string) {
        this.#client_id = CLIENT_ID;
        this.#client_secret = CLIENT_SECRET;
    }

    /**
     *
     * @param {number} [length] Optional default is "43"
     * @returns {codepair}
     */
    generatePKCEChallenge(length: number = 43): codepair {
        if (length < 43) throw new Error("Length Minimal 43");
        else if (length > 128) throw new Error("Length Maximal 128");
        const pkce = pkcegenerate(length);
        return { code_challenge: pkce.codeChallenge, code_verifier: pkce.codeVerifier };
    }

    /**
     *
     * @param {string} code_verifier Get this from method generatePKCEChallenge
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @returns {boolean}
     */
    verifyPKCEChallenge(code_verifier: string, code_challenge: string): boolean {
        return pkcecreateChallenge(code_verifier) === code_challenge;
    }

    /**
     *
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @param {string} [urlRedirect] Optional if your set only one url redirect from api config
     * @returns {string}
     */
    urlAuthorize(code_challenge: string, urlRedirect: string = ""): string {
        const query = {
            client_id: this.#client_id,
            code_challenge,
            code_challenge_method: "plain",
            redirect_uri: urlRedirect,
            response_type: "code",
        };
        return redirectURL(query);
    }

    /**
     *
     * @param {string} code To get code you must access url from method urlAuthorize
     * @param {string} code_challenge Get this from method generatePKCEChallenge
     * @param {string} urlRedirect If you set url from method urlAuthorize so url must be same
     * @returns
     */
    accessToken(code: string, code_challenge: string, urlRedirect: string = ""): Promise<Obj> {
        const data = {
            client_id: this.#client_id,
            client_secret: this.#client_secret,
            code: code,
            code_verifier: code_challenge,
            grant_type: "authorization_code",
            redirect_uri: urlRedirect,
        };
        return httpOauth2(data);
    }

    /**
     *
     * @param refresh_token Get this from method accessToken
     * @returns
     */
    refreshToken(refresh_token: string): Promise<Obj> {
        const data = {
            client_id: this.#client_id,
            client_secret: this.#client_secret,
            refresh_token: refresh_token,
            grant_type: "refresh_token",
        };
        return httpOauth2(data);
    }
}
