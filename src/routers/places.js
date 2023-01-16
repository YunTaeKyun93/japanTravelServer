const express = require("express");
const catchAsync = require("../utils/catch-async");
const Place = require("../models/place");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, name, images, description, coordinates, tag } = req.body;
    const places = new Place({
      id,
      name,
      images,
      description,
      coordinates,
      tag
    });
    await places.save();
    res.send({});
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const relatedPlaces = req.query.relatedPlaces
    const places = await Place.find({
      _id:relatedPlaces
    })
    
    res.send(places);
  })
);

module.exports = router;
