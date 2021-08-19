/// <reference types="superagent" />

declare class oauth2 {
    private client_id;
    private client_secret;
    private redirect_uri;
    private baseurl;
    private urlRedirect;
    private urlToken;
    constructor(CLIENT_ID: string, CLIENT_SECRET?: string);
    /**
     * @param {number} length Optional default 43 (Min.43, Max 128)
     */
    generatePKCEChallenge(length?: number): void | {
        code_challenge: string;
        code_verifier: string;
    };
    verifyPKCEChallenge(CODE_VERIFIER: string, CODE_CHALLENGE: string): boolean;
    urlAuthorize(CODE_CHALLENGE: string, urlRedirect: string): string;
    accessToken(code: string, codeVerifier: string): Promise<object>;
    refreshToken(refresh_token: string): Promise<object>;
}
declare class baseclass {
    private urlBase;
    private token;
    constructor(access_token: string);
    get(params: string): import("superagent").SuperAgentRequest;
}
declare class anime extends baseclass {
    constructor(access_token: string);
    animeId({ id, fields }: { id: number; fields?: string[] | string }): Promise<object>;
    animeSearch({ q, offset, limit, fields }: { q: any; offset?: number; limit?: number; fields?: string[] | string }): Promise<object>;
}

export { anime as MAL_API_ANIME, oauth2 as MAL_OAUTH2 };
