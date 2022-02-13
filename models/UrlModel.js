import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
  urlCode: String,
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model("Url", URLSchema);

export default Url;
