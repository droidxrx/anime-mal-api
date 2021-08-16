// const { createHash, randomBytes } = require("crypto");
// function random(size, mask) {
//     let result = "";
//     const randomIndices = randomBytes(size);
//     const byteLength = Math.pow(2, 8);
//     const maskLength = Math.min(mask.length, byteLength);
//     const scalingFactor = byteLength / maskLength;
//     for (let i = 0; i < size; i++) {
//         const randomIndex = Math.floor(randomIndices[i] / scalingFactor);
//         result += mask[randomIndex];
//     }
//     return result;
// }
// function base64UrlEncode(base64) {
//     return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
// }
// function generateVerifier(length) {
//     return random(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~");
// }
// function generateChallenge(code_verifier) {
//     return base64UrlEncode(createHash("sha256").update(code_verifier).digest("base64"));
// }
// function pkceChallenge() {
//     const verifier = generateVerifier(43);
//     const challenge = generateChallenge(verifier);
//     return { code_challenge: challenge, code_verifier: verifier };
// }
const CryptoJS = require("crypto-js");

function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function base64URL(string) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pkceChallenge(size = 50) {
    const verifier = generateRandomString(size);
    const challenge = base64URL(CryptoJS.SHA256(verifier));
    return { code_challenge: challenge, code_verifier: verifier };
}
module.exports = pkceChallenge;
