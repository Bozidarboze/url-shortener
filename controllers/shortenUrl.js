import validator from "validator";
import Url from "../models/UrlModel.js";

const shortenUrl = (req, res) => {
  const originalUrl = req.body.url;
  const baseUrl = "https://bozidar-url-shortener.herokuapp.com";
  let urlCode;

  !validator.isURL(originalUrl) && res.json({ error: "invalid url" });

  Url.find((err, urls) => {
    urlCode = urls.length + 1;
  });

  Url.findOne(
    {
      originalUrl,
    },
    (err, url) => {
      if (err) {
        res.status(400).json("Server Error");
      } else {
        if (url) {
          res.json({ originalUrl, shortUrl: url.urlCode });
        } else {
          const shortUrl = baseUrl + "/api/shorturl/" + urlCode;

          const url = new Url({
            urlCode,
            originalUrl,
            shortUrl,
          });
          url.save();
          res.json({ original_url: url.originalUrl, short_url: url.urlCode });
        }
      }
    }
  );
};

export default shortenUrl;
