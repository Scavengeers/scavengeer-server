import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  // _id: Schema.Types.ObjectId,
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
      // _id: Schema.Types.ObjectId,
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
});

export default mongoose.models.GameSchema ||
  mongoose.model("GameSchema", GameSchema);
