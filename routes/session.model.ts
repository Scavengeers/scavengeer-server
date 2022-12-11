import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionDocument = new Schema({
  gameId: String,
  isAUser: Boolean,
  isFinished: Boolean,
  gameProgress: Number,
  uId: String,
  initialLocation: String,
  distance: Number,
  points: Number,
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.sessionDocument ||
  mongoose.model("session", sessionDocument);
