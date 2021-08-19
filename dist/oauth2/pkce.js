Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyChallenge = exports.pkceChallenge = void 0;
const crypto_js_1 = require("crypto-js");
function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function base64URL(string) {
    return string.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function pkceChallenge(length) {
    const verifier = generateRandomString(length);
    const challenge = base64URL(crypto_js_1.SHA256(verifier).toString(crypto_js_1.enc.Base64));
    return { code_challenge: challenge, code_verifier: verifier };
}
exports.pkceChallenge = pkceChallenge;
function verifyChallenge(code_verifier, expectedChallenge) {
    const actualChallenge = base64URL(crypto_js_1.SHA256(code_verifier).toString(crypto_js_1.enc.Base64));
    return actualChallenge === expectedChallenge;
}
exports.verifyChallenge = verifyChallenge;
