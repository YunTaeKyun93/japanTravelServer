const express = require('express');
const Token = require('../models/token');
const User = require('../models/user');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// localhost/me?user=1234
// 1. Authorization 헤더가 없어도 Request자체는 해석이 가능해야 함.
// 2. 유저식별이 모호: 리퀘스트에 유저가 2명 이상 들어갈 때 모호함.
router.get('/', authenticate, async (req, res) => {



  const tokenObj = req.locals.token;

  // 파라미터 체크
  if (tokenObj.user.toString() !== req.query.user) {
    res.status(403).send({});
    return;
  }

  // 유저의 데이터를 가져와서
  const user = await User.findById(req.query.user);
  if (user == null) {
    res.status(404).send({
      errorMessage: '유저를 찾을 수 없음. 아마 삭제되었을수도',
    });
    return;
  }

  // 리스폰스
  res.send({
    id: user._id.toString(),
    // name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

module.exports = router;
