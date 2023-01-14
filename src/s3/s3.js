const express = require("express");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");

// const region = "ap-northeast-1";
// const bucket = "lotte-world-ticket";
const region = "ap-northeast-2";
const bucket = "taek-test";

const s3 = new S3Client({ region });

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileKey = uuid();

      if (req.locals == null) {
        req.locals = {};
      }
      req.locals.fileKey = fileKey;

      cb(null, fileKey);
    }
  })
});

module.exports = { upload };

