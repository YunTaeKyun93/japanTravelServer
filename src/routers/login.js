const express = require('express');
const {v4: uuid} = require('uuid');
const Token = require('../models/token');
const User = require('../models/user');
const catchAsync = require('../utils/catch-async');
const router = express.Router();

router.post('/',catchAsync( async (req, res) => {

  const {email, password} = req.body;
  
  // 1. 유저를 email로 찾는다.
  const user = await User.findOne({email}).exec();

  if (user == null) {
    res.status(401).send({
      errorMessage: '해당 email을 가진 유저를 찾을 수 없습니다',
    });
    return;
  }

  // 2. 리퀘스터가 준 password와 유저의 password가 동일한지 확인한다.
  if (user.password !== password) {
    res.status(401).send({
      errorMessage: '비밀번호가 잘못되었습니다',
    });
    return;
  }

  // 3. 토큰을 생성한다.(uuid)
  const token = uuid();

  // 4. 토큰을 DB에 저장한다.(Token 모델)
  const newTokenInst = new Token({
    user: user._id,
    token,
  });
  await newTokenInst.save();

  // 5. 토큰을 리스폰스한다.
  res.send({
    token,
    userId: user._id.toString(),
  });
}));

module.exports = router;

// 1. 토큰이 DB에 저장되어 있는지 확인한다.
// 2. 되어있다면 해당 토큰의 유저 ID를 req 오브젝트에 삽입한다.(middleware)
