const express = require("express");
const cors = require("cors");
const router = require("./router");
const { join, resolve } = require("path");

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const urlRedirect = `${LOCALHOST}/oauth2`;
const jsonFile = join(__dirname, "./db.json");

const CLIENT_ID = "YOUR_CLIENT_ID";

const app = express();
app.use(cors());
app.use(router.oauth2(CLIENT_ID, jsonFile, urlRedirect));
app.use(router.search(jsonFile));
app.use(express.static(resolve("public")));
app.listen(PORT, () => {
    console.log(LOCALHOST);
});
