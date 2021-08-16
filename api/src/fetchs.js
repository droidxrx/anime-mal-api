const superagent = require("superagent");

function token(sendData) {
    return new Promise((resolve, reject) => {
        const fet = superagent.post("https://myanimelist.net/v1/oauth2/token").send(sendData).type("application/x-www-form-urlencoded");
        fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
    });
}

function get(access_token, params, fields) {
    const fet = superagent.agent().auth(access_token, { type: "bearer" });
    return new Promise((resolve, reject) => {
        fet.get(`https://api.myanimelist.net/v2/${params}`)
            .query(fields)
            .then((response) => resolve(response.body))
            .catch((error) => reject(JSON.parse(error.response.text)));
    });
}

exports.get = get;
exports.token = token;
