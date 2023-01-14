const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    anime: {

        
      type: mongoose.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

// bookmarkSchema.index({user: 1, anime: 1}, {unique: true});

const Bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = Bookmark;
