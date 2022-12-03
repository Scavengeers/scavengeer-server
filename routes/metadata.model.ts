import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MetadataSchema = new Schema({
  _id: Schema.Types.ObjectId,
  sessionId: String,
  startLocation: String,
  endtLocation: String,
  device: String,
});

export default mongoose.models.MetadataSchema ||
  mongoose.model("MetadataSchema", MetadataSchema);
