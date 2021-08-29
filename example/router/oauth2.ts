import { Router } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { readJsonSync, writeJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { existsSync } from "https://deno.land/std@0.106.0/fs/mod.ts";
import { OAUTH2 } from "../../mod.ts";

type oauth2Router = {
    CLIENT_ID: string;
    CLIENT_SECRET?: string;
    fileJson: string;
    urlRedirect?: string;
};

//prettier-ignore
export function oauth2({ CLIENT_ID, CLIENT_SECRET, fileJson, urlRedirect }: oauth2Router) {
    const router = Router();
    const oauth = new OAUTH2(CLIENT_ID, CLIENT_SECRET);
    return router.get("/:path?", function (req, res) {
        const { params: { path }, query: { code } } = req;

        if (!path && code) {
            if (existsSync(fileJson)) {
                const getdata: any = readJsonSync(fileJson) || {}, code_challenge = getdata.pkce.code_challenge
                oauth.accessToken(code, code_challenge, urlRedirect).then((response) => {
                    const { status, return: result } = response
                    if (status) writeJsonSync(fileJson, { ...getdata, ...result });
                    res.json(response);
                });
            } else res.json({status: false, error: "code_challage not found"})
        } else if (path === "refresh-token") {
            const getdata: any = readJsonSync(fileJson) || {}, refresh_token = getdata.refresh_token
            oauth.refreshToken(refresh_token).then((response) => {
                const { status, return: result } = response
                if (status) writeJsonSync(fileJson, { ...getdata, ...result });
                res.json(response);
            });
        } else if (path === "authorize") {
            const pkce = oauth.generatePKCEChallenge(), urlAuthorize = oauth.urlAuthorize(pkce.code_challenge, urlRedirect);

            if (existsSync(fileJson)) {
                const getdata: any = readJsonSync(fileJson) || {}
                writeJsonSync(fileJson, { ...getdata, pkce })
            } else writeJsonSync(fileJson, { pkce });

            res.redirect(urlAuthorize);
        } else res.json({status: false, error: "Params 'code' not found"})
    });
}
