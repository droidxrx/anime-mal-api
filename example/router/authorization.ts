import { OAUTH2 } from "anime-mal-api";
import { Router } from "express";
import { readFile, writeFile } from "jsonfile";

interface options {
	CLIENT_ID: string;
	CLIENT_SECRET?: string;
	DATABASE: string;
	URL_REDIRECT: string;
}

interface database {
	pkce: {
		code_challenge: string;
		code_verifier: string;
	};
	token: {
		token_type: string;
		expires_in: number;
		access_token: string;
		refresh_token: string;
	};
}

interface objParams {
	authorization: OAUTH2;
	DATABASE: string;
	code?: any;
	URL_REDIRECT?: string;
	method?: string;
	res: any;
}

//prettier-ignore
async function getOrRefreshToken({ authorization, DATABASE, code, URL_REDIRECT, method, res}: objParams): Promise<void> {
    try {
        const data: database = await readFile(DATABASE);
        const { pkce: { code_challenge }, token: { refresh_token } } = data;
        const assignDataBase = (DATABASE: string, data: Record<string, any>) => {
            writeFile(DATABASE, data, (err) => console.log(err ? err : "Success assign database."));
        };
        const delStatus = (res: any) => {
            const nResp = { ...res }
            delete nResp.status;
            return nResp
        }

        try {
            if (method === "get") {
                const response = await authorization.accessToken(code.toString(), code_challenge, URL_REDIRECT);
                assignDataBase(DATABASE, {...data, token: delStatus(response)});
                res.json(response);
            } else if (method === "refresh") {
                const response = await authorization.refreshToken(refresh_token);
                assignDataBase(DATABASE, {...data, token: delStatus(response)});
                res.json(response);
            } else {
                const pkce = authorization.generatePKCEChallenge()
                assignDataBase(DATABASE, {...data, pkce});
                res.redirect(authorization.urlAuthorize(pkce.code_challenge, URL_REDIRECT));
            }
        } catch (error) {
            res.json(error);
        }
    } catch (error) {
        res.json({ status: false, error: `File: ${DATABASE} not found.` });
    }
}

//prettier-ignore
export default function (options: options): Router {
	const router: Router = Router();
	const { CLIENT_ID, CLIENT_SECRET, DATABASE, URL_REDIRECT } = options;
	const authorization = new OAUTH2(CLIENT_ID, CLIENT_SECRET);

	return router.get("/:path?", (req, res) => {
		const { params: { path }, query: { code } } = req;

		if (!path) {
			if (code) {
				getOrRefreshToken({ authorization, DATABASE, code, URL_REDIRECT, method: "get", res });
			} else {
				res.json({ status: false, error: "Params 'code' not found or empty." });
			}
		} else if (path === "refresh-token") {
			getOrRefreshToken({ authorization, DATABASE, method: "refresh", res });
		} else if (path === "authorize") {
			getOrRefreshToken({ authorization, DATABASE, URL_REDIRECT, res });
		}
	});
}
