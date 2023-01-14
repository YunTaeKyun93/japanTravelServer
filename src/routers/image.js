const express = require('express');
const multer = require('multer');
const catchAsync = require('../utils/catch-async');
const {upload} = require('../s3/s3');
const router = express.Router();

router.post('/', upload.single('file'), catchAsync(async (req, res) => {
  res.send({fileKey: req.locals.fileKey});
}));

module.exports = router;