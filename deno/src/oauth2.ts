import * as pkce from "https://deno.land/x/pkce_deno@v2.0/mod.ts";
import { stringify } from "./qs.ts";

interface codepair {
    code_challenge: string;
    code_verifier: string;
}
export default class oauth2 {
    private client_id: string;
    private client_secret?: string;
    private redirect_uri?: string;
    private redirectURL = "https://myanimelist.net/v1/oauth2/authorize";
    private tokenURL = "https://myanimelist.net/v1/oauth2/token";

    constructor(CLIENT_ID: string, CLIENT_SECRET?: string) {
        this.client_id = CLIENT_ID;
        this.client_secret = CLIENT_SECRET;
    }

    generatePKCEChallenge(length: number = 43): void | codepair {
        if (length < 43) return console.log("Length Minimal 43");
        if (length > 128) return console.log("Length Maximal 128");
        const _pkce = pkce.create(length);
        return { code_challenge: _pkce.codeChallenge, code_verifier: _pkce.codeVerifier };
    }

    verifyPKCEChallenge(code_verifier: string, code_challenge: string): boolean {
        const actualChallenge = pkce.createChallenge(code_verifier);
        return actualChallenge === code_challenge;
    }

    urlAuthorize(CODE_CHALLENGE: string, urlRedirect?: string) {
        const query = {
            client_id: this.client_id,
            code_challenge: CODE_CHALLENGE,
            code_challenge_method: "plain",
            redirect_uri: urlRedirect,
            response_type: "code",
        };
        urlRedirect === undefined && delete query.redirect_uri;
        const params = stringify(query, true);
        this.redirectURL = `${this.redirectURL}${params}`;
        urlRedirect && (this.redirect_uri = urlRedirect);
        return this.redirectURL;
    }
}
