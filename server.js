import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import shortenUrl from "./controllers/shortenUrl.js";
import redirectToOriginalUrl from "./controllers/redirectToOriginalUrl.js";

mongoose.connect(process.env.DB_URL {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/", shortenUrl);

app.get("/api/shorturl/:urlCode", redirectToOriginalUrl);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
