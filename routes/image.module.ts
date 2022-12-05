import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  gameModules: [
    new Schema({
      img: {
        data: Buffer,
        name: String,
        contentType: String,
      },
    }),
  ],
});

export default mongoose.models.imageSchema ||
  mongoose.model("imageSchema", imageSchema);
