const CryptoJS = require("crypto-js");

function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function base64URL(string) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pkceChallenge(length) {
    const verifier = generateRandomString(length);
    const challenge = base64URL(CryptoJS.SHA256(verifier));
    return { code_challenge: challenge, code_verifier: verifier };
}

function verifyChallenge(code_verifier, expectedChallenge) {
    const actualChallenge = base64URL(CryptoJS.SHA256(code_verifier));
    return actualChallenge === expectedChallenge;
}

exports.pkceChallenge = pkceChallenge;
exports.verifyChallenge = verifyChallenge;
