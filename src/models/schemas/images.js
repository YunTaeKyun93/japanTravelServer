const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  imageUrl :{type:String, require:true}
});

module.exports = imagesSchema;
