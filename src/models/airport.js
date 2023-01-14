const mongoose = require('mongoose');
const coordinatesSchema = require('./schemas/coordinates');

const airportSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    coordinates: {
      type: coordinatesSchema,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Airport = mongoose.model('airport', airportSchema);

module.exports = Airport;
