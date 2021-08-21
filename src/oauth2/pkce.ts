import { SHA256, enc } from "crypto-js";

function generateRandomString(length: number): string {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function base64URL(string: string) {
    return string.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function pkceChallenge(length: number) {
    const verifier = generateRandomString(length);
    const challenge = base64URL(SHA256(verifier).toString(enc.Base64));
    return { code_challenge: challenge, code_verifier: verifier };
}

export function verifyChallenge(
    code_verifier: string,
    expectedChallenge: string
) {
    const actualChallenge = base64URL(
        SHA256(code_verifier).toString(enc.Base64)
    );
    return actualChallenge === expectedChallenge;
}
