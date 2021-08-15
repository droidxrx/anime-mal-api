const superagent = require("superagent");

function fetToken(sendData) {
    return new Promise((resolve, reject) => {
        const query = sendData;
        const fet = superagent.post(query.url).send(query.params).type("application/x-www-form-urlencoded");
        fet.then((response) => resolve(response.body)).catch((error) => reject(JSON.parse(error.response.text)));
    });
}

module.exports = { fetToken };
