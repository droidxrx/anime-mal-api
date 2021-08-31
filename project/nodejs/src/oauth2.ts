import { httpOauth2, redirectURL, codepair, Obj, pkcegenerate, verifyChallenge } from "./utils";

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
     * @param length Optional default is "43"
     * @returns
     */
    generatePKCEChallenge(length = 43): codepair {
        if (length < 43) throw new Error("Length Minimal 43");
        else if (length > 128) throw new Error("Length Maximal 128");
        const { code_challenge, code_verifier } = pkcegenerate(length);
        return { code_challenge, code_verifier };
    }

    /**
     *
     * @param code_verifier Get this from method generatePKCEChallenge
     * @param code_challenge Get this from method generatePKCEChallenge
     * @returns
     */
    verifyPKCEChallenge(code_verifier: string, code_challenge: string): boolean {
        return verifyChallenge(code_verifier, code_challenge);
    }

    /**
     *
     * @param code_challenge Get this from method generatePKCEChallenge
     * @param urlRedirect Optional if your set only one url redirect from api config
     * @returns
     */
    urlAuthorize(code_challenge: string, urlRedirect = ""): string {
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
     * @param code To get code you must access url from method urlAuthorize
     * @param code_challenge Get this from method generatePKCEChallenge
     * @param urlRedirect If you set url from method urlAuthorize so url must be same
     * @returns
     */
    accessToken(code: string, code_challenge: string, urlRedirect = ""): Promise<Obj> {
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
