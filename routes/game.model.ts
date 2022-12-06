import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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
  image: String,
  estimatedTimeMinutes: Number,
  isPrivate: Boolean,

  gameModules: [
    new Schema({
      typeOfModule: String,
      title: {
        type: String,
        required: true,
        maxLength: [100, "Module title is too long!"],
      },
      description: String,
      question: String,
      answer: String,
      image: String,
      locationCoordinates: Array<number>,
    }),
  ],
  startingLocationCoordinates: Array<number>,

  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.GameSchema ||
  mongoose.model("GameSchema", GameSchema);
