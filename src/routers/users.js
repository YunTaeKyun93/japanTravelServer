const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const catchAsync = require("../utils/catch-async");

const router = express.Router();
mongoose.set("strictQuery", true);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // const emailRegExp =
    //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    // const passwordRegExp =
    //   /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;

    // if (!emailRegExp.test(req.body.email)) {
    //   res.status(401).send({
    //     errorMessage: "이메일 형식을 지켜주세요!!",
    //     errorCode: 'MALFORMED_EMAIL',
    //   });
    // }
    // if (!passwordRegExp.test(req.body.password)) {
    //   res.status(401).send({
    //     errorMessage:
    //       "특수문자가 포함된 최소 8자 이상의 비밀번호를 설정해 주세요!!"
    //     errorCode: 'MALFORMED_PASSWORD',
    //   });
    // }
    const user = new User({
      email,
      firstName,
      lastName,
      password,
      
    });
    await user.save();
    res.send({
      message: "회원가입 완료",
      userId: user._id.toString()
    });
  })
);

// router.patch(
//   "/:id",
//   catchAsync(async (req, res) => {

//     const user = await User.findById(req.params.id).exec();
//     const {
//       animeImageUrl,
//       loacationImageUrl,
//       animeTitle,
//       locationName,
//       story
//     } = req.body;
//     console.log(req.body);



    

//     user.bookmark.push(
//       animeImageUrl,
//       loacationImageUrl,
//       animeTitle,
//       locationName,
//       story
//     );
//     res.send({
//       message: "즐겨찾기 추가"
//     });
//   })
// );

module.exports = router;

/*

const isEmailValid = (email) => {
  const regExp = /.../;
  return regExp.test(email);
};

if (!isEmailValid(req.body.email)) {
  res.status(401).send({...});
}

1. 실수하기 쉽다.
2. 에러메세지가 상세하지 않음.


if (password.length < 4) {
  console.error("패스워드가 4자보다 작습니다.");
}

if (!containsSpecialCharacter(password)) {
  console.error("패스워드에 특수문자가 없습니다.");
}


******************

if (!isPasswordValid(password)) {
  console.error('비밀번호는 4자 이상이어야 하며, 특수문자가...');
}
*/
