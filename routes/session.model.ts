import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionDocument = new Schema({
  _id: String,
  uId: String,
  gameId: String,
  isFinished: Boolean,
  gameModulesIndex: Number,
  isCompleted: Boolean,
  timeStamp: { type: Date, default: Date.now }
});

export default mongoose.models.sessionDocument ||
  mongoose.model("session", sessionDocument);
