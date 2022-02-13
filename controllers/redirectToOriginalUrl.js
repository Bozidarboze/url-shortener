import Url from "../models/UrlModel.js";

const redirectToOriginalUrl = (req, res) => {
  const urlCode = req.params.urlCode;
  Url.findOne({ urlCode }, (err, url) => {
    if (err) {
      console.log("Server Error");
    } else {
      url ? res.redirect(url.originalUrl) : res.status(404).json("Invalid Url");
    }
  });
};

export default redirectToOriginalUrl;
