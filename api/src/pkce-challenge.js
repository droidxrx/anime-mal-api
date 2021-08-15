const { createHash, randomBytes } = require("crypto");
function random(size, mask) {
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
function base64UrlEncode(base64) {
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function generateVerifier(length) {
    return random(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~");
}
function generateChallenge(code_verifier) {
    return base64UrlEncode(createHash("sha256").update(code_verifier).digest("base64"));
}
function pkceChallenge() {
    const verifier = generateVerifier(43);
    const challenge = generateChallenge(verifier);
    return { code_challenge: challenge, code_verifier: verifier };
}
module.exports = pkceChallenge;
