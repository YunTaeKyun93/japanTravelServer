const express = require('express');
const Token = require('../models/token');
const catchAsync = require('../utils/catch-async');

const router = express.Router();

router.post('/', catchAsync(async (req, res) => {
  // token 가져오기
  const token = req.body.token;

  // DB에서 토큰 삭제하기
  await Token.deleteOne({token:token}).exec();

  // 리스폰스하기
  res.send({
    message:'로그아웃 되었습니다.'
  });
}));

module.exports = router;
