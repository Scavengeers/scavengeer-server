const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameDocument = new Schema({
  _id: Schema.Types.ObjectId,
  titleOfGame: {
    type: String,
    required: true,
    maxLength: [100, "Game title is too long!"],
  },
  description: {
    type: String,
    maxLength: [300, "Description is too long!"],
  },
  uId: String,
  isPrivate: Boolean,

  gameModules: [
    new Schema({
      _id: Schema.Types.ObjectId,
      typeOfModule: String,
      title: {
        type: String,
        required: true,
        maxLength: [100, "Module title is too long!"],
      },
      description: String,
      answer: String,
      picture: String,
    }),
  ],

  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },

  // sessions: [
  //   new Schema({
  //     _id: Schema.Types.ObjectId,
  //     uId: String,
  //     nameOfPlayer: String,
  //     startTime: { type: Date, default: Date.now },
  //     endTime: { type: Date, default: Date.now },
  //     duration: startTime - endTime,
  //   }),
  // ],

  // metaData: [
  //   new Schema({
  //     _id: Schema.Types.ObjectId,
  //     sessionId: String,
  //     startLocation: String,
  //     endtLocation: String,
  //     device: String,
  //   }),
  // ],
});

module.exports = mongoose.model("Games", gameDocument);
