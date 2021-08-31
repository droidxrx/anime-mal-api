import { superdeno } from "https://deno.land/x/superdeno@4.4.0/mod.ts";
export { create as pkcegenerate, createChallenge as pkcecreateChallenge } from "https://deno.land/x/pkce_deno@v2.0/mod.ts";

export interface codepair {
    code_challenge: string;
    code_verifier: string;
}

export type baseTypeForList = {
    score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    priority: 0 | 1 | 2;
    tags: string;
    comments: string;
};

export type Obj = {
    [key: string]: any;
};

type methodList = "delete" | "get" | "put";

// prettier-ignore
export function httpApi(token: string, path: string, method: methodList, query: Obj = {}): Promise<Obj> {
    const params = stringnify(query);
    const ctype = "application/x-www-form-urlencoded";
    const http = () => superdeno("https://api.myanimelist.net/v2")[method](path).set({ Authorization: `Bearer ${token}` });

    return new Promise(function(reso, reje) {
        const resolve = (r: any) => reso({ status: true, ...{ return: r.body } });
        const reject = (r: any) => reje({ status: false, ...{ return: r.body } });

        if (method === "delete") http().then((r) => "error" in r.body ? reject(r) : resolve(r)).catch(e => reje({status: false, return: e}))
        if (method === "get") http().query(params).then((r) => "error" in r.body ? reject(r) : resolve(r)).catch(e => reje({status: false, return: e}))
        if (method === "put") http().send(params).type(ctype).then((r) => "error" in r.body ? reject(r) : resolve(r)).catch(e => reje({status: false, return: e}))
    });
}

// prettier-ignore
export function httpOauth2(data: object): Promise<Obj> {
    const ctype = "application/x-www-form-urlencoded";
    const posts = () => superdeno("https://myanimelist.net/v1/oauth2").post("/token").send(stringnify(data)).type(ctype);

    return new Promise(function(resolve, reject) {
        const data = (status: boolean, r: any) => ({ status, ...{ return: r.body } })
        posts().then((r) => ("error" in r.body ? (resolve(data(false, r)), reject(data(false, r))) : resolve(data(true, r)))).catch((e) => reject(data(false, e)));
    })
}

export function redirectURL(obj: Obj): string {
    const url = "https://myanimelist.net/v1/oauth2/authorize";
    return `${url}${stringnify(obj, "?")}`;
}

// utils for class anime
export function getSeasonForNumberMonth(month: number) {
    if (month < 3) return "winter";
    else if (month > 2 && month < 6) return "spring";
    else if (month > 5 && month < 9) return "summer";
    else return "fall";
}
export function MonthIsValid(month: string): boolean {
    const months = ["winter", "spring", "summer", "fall"];
    return months.find((elm) => elm === month) === month;
}

function stringnify(obj: Obj, prefix: string = ""): string {
    const isArray = (val: any) => Array.isArray(val);
    const filterObj = (obj: Obj) => {
        const newObj: Obj = {};
        const condition = (val: any) => [undefined, null, ""].includes(val);
        for (const key in obj) {
            const valProp = obj[key];
            if (!condition(valProp)) {
                if (isArray(valProp)) newObj[key] = valProp.toString();
                else newObj[key] = valProp;
            }
        }
        return newObj;
    };
    const params = `${prefix}${new URLSearchParams(filterObj(obj)).toString()}`;
    return decodeURIComponent(params);
}
