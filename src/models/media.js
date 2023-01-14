const mongoose = require("mongoose");

const coordinatesSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const contentSchema = new mongoose.Schema({
  animeImageUrl: String,
  loacationImageUrl: String,
  animeTitle: String,
  locationName: String,
  streamingUrl: String,
  story: String,
  coordinates: coordinatesSchema
});

const mediaSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true
  },
  title: {
    type: String,
    require: true,
    unique: true
  },
  contents: [contentSchema]
});
const Media = mongoose.model("media", mediaSchema);

module.exports = Media;
