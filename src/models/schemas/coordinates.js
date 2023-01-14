const mongoose = require("mongoose");

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, require: true },
  lng: { type: Number, require: true }
});

module.exports = coordinatesSchema;
