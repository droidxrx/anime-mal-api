import express from "express";
import cors from "cors";
import * as router from "./router";

const PORT = process.env.PORT.replace(" ", "");
const HOMEURL = `http://localhost:${PORT}`;
const options = {
	CLIENT_ID: "YOUR_CLIEN_ID",
	DATABASE: "D:\\Repositories\\anime-mal-api\\example\\database.json",
	URL_REDIRECT: `${HOMEURL}/oauth2`,
};

const app = express();

app.use(cors());
app.use("/oauth2", router.authorization(options));
app.get("/", (req, res) => res.send("anjing"));
app.listen(PORT, () => console.log(`server has started on ${HOMEURL} 🚀`));
