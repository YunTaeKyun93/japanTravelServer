// const aws = require('aws-sdk')
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");

/**
 * aws s3에 이미지 파일 저장하고
 * db에는 해당 이미지 파일 경로(이미지 주소)를 저장
 * 서버는 해당 경로를 클라이언트로 응답한다..??
 */
// const s3 = new aws.S3({
//   accessKeyId: 'AKIA4FJR3BNK2BH4IHD4',
//   secretAccessKey: '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',
//   region: 'ap-northeast-1',
// });
const s3 = new S3Client({
  region: "ap-northeast-1",
});

const upload = multer({
  storage: multerS3({
    //s3에저장
    s3,
    acl: "public",
    bucket: "lotte-world-ticket",
    key: (req, file, cb) => {
      const mime = file.mimetype;

      let ext;
      if (mime === "image/jpeg") {
        ext = "jpg";
      }
      if (mime === "image/png") {
        ext = "png";
      }
      if (ext == null) {
        throw new Error("허용되지 않은 mime 타입");
      }

      const fileKey = `${uuid()}.${ext}`;
      cb(null, fileKey);
    }
  })
});

module.exports = {
  upload
};

// router.post('/', upload.single('file'), (req, res) => {
//   // 파일의 키를 가져와서 DB에 저장하는 것 까지.
// })

/*

const uploadS3 = multer({
  storage: multerS3({
    s3,
    acl: 'private',
    bucket,
    // metadata: (req, fild, cb) => {
    //
    // },
    key: (req, file, cb) => {
      try {
        const mime = file.mimetype;

        // Check whether it's allowed.
        if (!isAllowedMime(mime)) {
          throw new ApiError(httpStatus.BAD_REQUEST, errorData.INVALID_MIMETYPE);
        }

        // Get appropriate extension.
        const ext = mimeToExt(mime);

        // Send final s3 object name.
        cb(null, `${uuid()}.${ext}`);
      } catch (e) {
        cb(e);
      }
    },
  }),
});

*/
