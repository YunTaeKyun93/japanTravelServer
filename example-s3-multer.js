require('dotenv').config();
const express = require('express');
const { S3Client } = require('@aws-sdk/client-s3'); // v2(모든 코드가 한 프로젝트), v3(100) (aws-sdk)
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuid} = require('uuid');

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_BUCKET;

const s3 = new S3Client({ region });

// Key-Value
// JS Object

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    // contentType: (req, file, cb) => {
    //   cb(null, 'image/png');
    // },
    // contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileKey = uuid();

      if (req.locals == null) {
        req.locals = {}
      }
      req.locals.fileKey = fileKey;

      cb(null, fileKey);
    },
  }),
});

const app = express();
app.use(express.json({strict: false}));

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({
    fileKey: req.locals.fileKey,
  });
});

const catchAsync = (fn) => {
  const newFn = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch(error) {
      next(error);
    }
  };

  return newFn;
};

const images = [];

const serializeImage = (a) => {
  return {
    id: a.id,
    name: a.name,
    file: a.file,
    fileUrl: `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${a.file}`,
  };
};

app.post('/images', catchAsync(async (req, res) => {
  const newImage = {
    id: uuid(),
    name: req.body.name,
    file: req.body.file,
  };

  images.push(newImage);

  res.send(serializeImage(newImage));
}));

const port = 5200;

app.listen(port, () => {
  console.log(`The server is running on the port ${port}.`);
});
