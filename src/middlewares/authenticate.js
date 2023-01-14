const Token = require('../models/token');

const authenticate = async (req, res, next) => {
  // 토큰 체크
  const token = req.headers.authorization;
  if (token == null) {
    res.status(401).send({});
    return;
  }
  const tokenObj = await Token.findOne({token}).exec();
  if (tokenObj == null) {
    res.status(401).send({});
    return;
  }
  if (req.locals == null) {
    req.locals = {};
  }
  req.locals.token = tokenObj;
  next();
};

module.exports = authenticate;
