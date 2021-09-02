import * as superagent from "superagent";
import { createHash, randomBytes } from "crypto";
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

export interface Obj {
	[key: string]: any;
}
type season = "winter" | "spring" | "summer" | "fall";
type methodList = "delete" | "get" | "put";

function stringnify(obj: Obj, prefix = ""): string {
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
function random(size: number, mask: string) {
	let result = "";
	const randomIndices = randomBytes(size);
	const byteLength = Math.pow(2, 8);
	const maskLength = Math.min(mask.length, byteLength);
	const scalingFactor = byteLength / maskLength;
	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(randomIndices[i] / scalingFactor);
		result += mask[randomIndex];
	}
	return result;
}
function base64UrlEncode(base64: string) {
	return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function generateVerifier(length: number) {
	const mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
	return random(length, mask);
}
function generateChallenge(code_verifier: string) {
	const hash = createHash("sha256").update(code_verifier).digest("base64");
	return base64UrlEncode(hash);
}
export function pkcegenerate(length: number): codepair {
	if (!length) length = 43;
	if (length < 43 || length > 128) {
		throw new Error(`Expected a length between 43 and 128. Received ${length}.`);
	}
	const verifier = generateVerifier(length);
	const challenge = generateChallenge(verifier);

	return { code_challenge: challenge, code_verifier: verifier };
}
export function verifyChallenge(code_verifier: string, code_challenge: string): boolean {
	const actualChallenge = generateChallenge(code_verifier);
	return actualChallenge === code_challenge;
}
/* ----------------------------------------------------------------------------------------------------------------- */
// prettier-ignore
export function httpApi(token: string, path: string, method: methodList, query: Obj = {}): Promise<Obj> {
	const baseUrl = "https://api.myanimelist.net/v2";
	const { agent } = superagent;
	const http = () => agent().auth(token, { type: "bearer" })[method](`${baseUrl}${path}`);
	const cType = "application/x-www-form-urlencoded";
	const isSuccess = (data: superagent.Response) => ({ status: true, return: data.body });
	const isFailed = (data: any) => ({ status: false, return: JSON.parse(data.response.text) });
    
	return new Promise((resolve, reject) => {
        if (method === "delete") http().then((response) => resolve(isSuccess(response))).catch((error) => reject(isFailed(error)));
        else if (method === "get") http().query(stringnify(query)).then((response) => resolve(isSuccess(response))).catch((error) => reject(isFailed(error)));
        else if (method === "put") http().send(stringnify(query)).type(cType).then((response) => resolve(isSuccess(response))).catch((error) => reject(isFailed(error)));
    })
}
export function httpOauth2(data: Obj): Promise<Obj> {
	const url = "https://myanimelist.net/v1/oauth2/token";
	return new Promise((resolve, reject) => {
		superagent
			.post(url)
			.send(data)
			.type("application/x-www-form-urlencoded")
			.then((response) => resolve(Object.assign({ status: true }, response.body)))
			.catch((error) => reject(Object.assign({ status: false }, JSON.parse(error.response.text))));
	});
}
export function redirectURL(obj: Obj): string {
	const url = "https://myanimelist.net/v1/oauth2/authorize";
	return `${url}${stringnify(obj, "?")}`;
}
export function getSeasonForNumberMonth(month: number): season {
	if (month < 3) return "winter";
	else if (month > 2 && month < 6) return "spring";
	else if (month > 5 && month < 9) return "summer";
	else return "fall";
}
export function MonthIsValid(month: string): boolean {
	const months = ["winter", "spring", "summer", "fall"];
	return months.find((elm) => elm === month) === month;
}
