import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  _id: String,
  isPublished: {
    type: String,
    required: true,
  },
  isPrivate: Boolean,
  titleOfGame: {
    type: String,
    required: true,
    maxLength: [100, "Game title is too long!"],
  },
  description: {
    type: String,
    maxLength: [1000, "Description is too long!"],
  },
  uId: String,
  author: {
    type: String,
    maxLength: [50, "Name is too long!"],
  },
  rating: {
    type: String,
    maxLength: [4],
  },
  gameImageURL: String,
  estimatedTimeMinutes: Number,

  gameModules: [
    new Schema({
      _id: String,
      typeOfModule: String,
      title:String,
      description: String,
      question: String,
      answer: String,
      imageURL: String,
      locationCoordinates: Array<number>,
      hint: String,
    }),
  ],
  startingLocationCoordinates: Array<number>,
  startLocation: String,

  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.GameSchema ||
  mongoose.model("GameSchema", GameSchema);
