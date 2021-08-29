import { Router } from "https://deno.land/x/opine@1.7.2/mod.ts";
import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { API } from "../../mod.ts";
export function user(fileJson: string) {
    const router = Router();
    return router.get("/", function (req, res) {
        const {
            query: { fields },
        } = req;
        const { access_token }: any = readJsonSync(fileJson);
        const user = new API(access_token).USER();
        // Get info
        user.me(fields?.split(",")).then((resp) => res.json(resp));
    });
}
