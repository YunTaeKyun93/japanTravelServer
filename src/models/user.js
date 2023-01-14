const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

});

// userSchema.index({email: 1}, {unique: true});

const User = mongoose.model("user", userSchema);

module.exports = User;

/*
const users = await User.find({}).exec();

for (let i = 0; i < users.length; ++i) {
  const user = users[i];

  for (let j = 0; j < user.bookmark.length; ++j) {
    const currentBookmark = user.bookmark[j];

    const newBookmark = new Bookmark({
      user: user._id,
      media: currentBookmark,
    });
    await newBookmark.save();
  }

  user.bookmark = undefined;
  await user.save();
}
*/