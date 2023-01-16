const express = require("express");
const Anime = require("../models/anime");
const catchAsync = require("../utils/catch-async");
const Place = require("../models/place");
const RelatedPlace = require("../models/relatedPlace");
const mongoose = require("mongoose");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { animeId, placeId } = req.body;
    const anime = await Anime.findById({ animeId }).exec();
    const place = await Place.findById({ placeId }).exec();

    const checkAnimeId =
      (await Anime.countDocuments({ _id: mongoose.Types.ObjectId(animeId) })) ==
      1;
    const checkPlaceId =
      (await Anime.countDocuments({ _id: mongoose.Types.ObjectId(placeId) })) ==
      1;
    if (!checkAnimeId) {
      res.status(401).send({
        errorMessage: "해당 ID를 가진 애니메이션을 찾을 수 없습니다",
      });
    }
    if (!checkPlaceId) {
      res.status(401).send({
        errorMessage: "해당 ID를 가진 장소를 찾을 수 없습니다",
      });
    }

    const relatedPlace = new RelatedPlace({
      anime: anime._id,
      place: place._id,
    });
    await relatedPlace.save();
    res.send({
      message: "요청 완료",
    });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const place = req.params.id;
    const relatedPlace = await RelatedPlace.find({
      place
    }).exec();
    res.send(relatedPlace);
  })
);

module.exports = router;
