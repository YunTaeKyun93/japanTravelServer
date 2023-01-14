const mongoose = require("mongoose");
const coordinatesSchema = require("./schemas/coordinates");
const imageSchema = require("./schemas/images");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    images: [imageSchema],
    streamingUrl: { type: String, require: true },
    story: { type: String, require: true }
  },
  {
    timestamps: true
  }
);

const Anime = mongoose.model("anime", animeSchema);

module.exports = Anime;
