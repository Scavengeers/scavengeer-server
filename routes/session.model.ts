import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  uId: String,
  nameOfPlayer: String,
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
});

export default mongoose.models.SessionSchema ||
  mongoose.model("SessionSchema", SessionSchema);

//everytime player plays a game, keep track/
