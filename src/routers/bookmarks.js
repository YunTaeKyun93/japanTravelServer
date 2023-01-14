const express = require("express");

const User = require("../models/user");
const Anime = require("../models/anime");
const Bookmark = require("../models/bookmark");
const catchAsync = require("../utils/catch-async");

const router = express.Router();

router.post(
  "/:userId/:animeId",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.userId).exec();
    const anime = await Anime.findById(req.params.animeId).exec();
    //     const {
    // anime
    //     } = req.body;

    const newBookmarkInst = new Bookmark({
      user: user._id,
      anime: anime._id
    });
    res.send({
      message: "즐겨찾기 추가 완료"
    });
    await newBookmarkInst.save();
  })
);
module.exports = router;
