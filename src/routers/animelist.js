const express = require("express");
const Anime = require("../models/anime");
const catchAsync = require("../utils/catch-async");
const router = express.Router();
const RelatedPlace = require("../models/relatedPlace");
const Place = require("../models/place");

const readRelatedPlaceIds = async (animeId) => {
  // 관련있는 플레이스를 가져옴.
  const relatedPlaceRelations = await RelatedPlace.find({ anime: animeId }).exec();
  const relatedPlaceIds = relatedPlaceRelations.map((relation) => relation.place);

  return relatedPlaceIds;
  // const relatedPlaces = await Promise.all(relatedPlaceRelations.map(async ({place: placeId}) => {
  //   const place = await Place.findById(placeId);
  //   return place;
  // }));
};

const readRelatedPlaces = async (animeId) => {
  // 관련있는 플레이스를 가져옴.
  const relatedPlaceRelations = await RelatedPlace.find({ anime: animeId }).exec();

  const relatedPlaces = await Promise.all(relatedPlaceRelations.map(async ({place: placeId}) => {
    const place = await Place.findById(placeId);
    return place;
  }));

  return relatedPlaces;
};

const serialize = async (anime) => {
  return {
    id: anime._id.toString(),
    _id: anime._id,
    title: anime.title,
    images: anime.images,
    streamingUrl: anime.streamingUrl,
    story: anime.story,
    // ...anime,
    relatedPlaces: (await readRelatedPlaceIds(anime._id)).map(id => id.toString()),
    // relatedPlaces: await readRelatedPlaces(anime._id),
  };
};

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, title, story, images, streamingUrl } = req.body;
    const animeList = new Anime({
      id,
      title,
      story,
      images,
      streamingUrl
    });
    await animeList.save();
    res.send({});
  })
);
router.get(
  "/",
  catchAsync(async (req, res) => {
    const animeList = await Anime.find().exec();
    res.send(await Promise.all(animeList.map(serialize)));
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const anime = await Anime.findById(req.params.id);
    res.send(await serialize(anime));
  })
);

module.exports = router;
