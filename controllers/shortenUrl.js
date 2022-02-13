import validUrl from "valid-url";
import shortid from "shortid";
import Url from "../models/UrlModel.js";

const shortenUrl = (req, res) => {
  const originalUrl = req.body.url;
  const baseUrl = "http:localhost:3000";

  if (!validUrl.isUri(originalUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortid.generate();

  Url.findOne(
    {
      originalUrl,
    },
    (err, url) => {
      if (err) {
        res.status(400).json("Server Error");
      } else {
        if (url) {
          res.json({ originalUrl, shortUrl: url.shortUrl });
        } else {
          const shortUrl = baseUrl + "/api/shorturl/" + urlCode;

          const url = new Url({
            urlCode,
            originalUrl,
            shortUrl,
          });
          url.save();
          res.json({ originalUrl, shortUrl: url.shortUrl });
        }
      }
    }
  );
};

export default shortenUrl;
