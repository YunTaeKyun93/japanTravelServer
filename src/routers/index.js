const express = require("express");

const airportRouter = require("./airport");
const animeListRouter = require("./animelist");
const mediaListRouter = require("./medialist");
const usersRouter = require("./users");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const meRouter = require("./me");
const imageRouter = require("./image");
const bookmarksRouter = require("./bookmarks");
const placesRouter = require("./places");
const relatedPlaceRouter = require("./relatedPlaces");
const router = express.Router();

router.use("/animeList", animeListRouter);
router.use("/mediaList", mediaListRouter);
router.use("/airports", airportRouter);
router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/me", meRouter);
router.use("/images", imageRouter);
router.use("/bookmarks", bookmarksRouter);
router.use("/places", placesRouter);
router.use("/relatedPlaces", relatedPlaceRouter);
router.use("/url/images", express.static("uploads"));

module.exports = router;
