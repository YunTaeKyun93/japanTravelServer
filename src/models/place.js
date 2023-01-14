const mongoose = require("mongoose");
const coordinatesSchema = require("./schemas/coordinates");
const imagesSchema = require("./schemas/images");
const tagScema = new mongoose.Schema({
  animeTitle: { type: String }
});
const placeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    locationImages: [imagesSchema],
    animeImages: [imagesSchema],
    description: { type: String },
    coordinates: coordinatesSchema,
    tag:  [tagScema]
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model("place", placeSchema);

module.exports = Place;
