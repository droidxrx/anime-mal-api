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
    const verifier = generateRandomString(length ? (length < 43 ? 43 : length > 128 ? 128 : length) : 43);
    const challenge = base64URL(CryptoJS.SHA256(verifier));
    return { code_challenge: challenge, code_verifier: verifier };
}

module.exports = pkceChallenge;
