const express = require("express");
const catchAsync = require("../utils/catch-async");
const Media = require("../models/media");
const router = express.Router();
router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, title, contents } = req.body;
    const mediaList = new Media({
      id,
      title,
      contents
    });
    await mediaList.save();
    res.send({});

  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const mediaList = await Media.find();
    res.send(mediaList);
  })
);

router.get('/:id',catchAsync(async(req,res)=>{
 
  const media = await Media.findById(req.params.id);
  console.log(media)
  res.send(media);


}))

module.exports = router;
