const fs = require("fs");

function loadData(path) {
    try {
        return JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (err) {
        console.error(err);
        return false;
    }
}

function writeData(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
}

module.exports = { loadData, writeData };
