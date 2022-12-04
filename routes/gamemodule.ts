import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameModules = new Schema({
  gameModules: [
    new Schema({
      typeOfModule: String,
      title: {
        type: String,
        required: true,
        maxLength: [100, "Module title is too long!"],
      },
      description: String,
      answer: String,
      img: {
        data: Buffer,
        contentType: String,
      },
      locationCoordinates: String,
    }),
  ],
});

export default mongoose.models.gameModules ||
  mongoose.model("gameModule", gameModules);
