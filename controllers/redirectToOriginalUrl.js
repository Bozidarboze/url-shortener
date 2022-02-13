import Url from "../models/UrlModel.js";

const redirectToOriginalUrl = (req, res) => {
  const urlCode = req.params.urlCode;
  Url.findOne({ urlCode }, (err, url) => {
    if (err) {
      console.log("Server Error");
    } else {
      res.redirect(url.originalUrl);
    }
  });
};

export default redirectToOriginalUrl;
