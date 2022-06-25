import mongoose from "mongoose";
import validator from "validator";

const activeroomSchema = mongoose.Schema({
  users: { type: [Array] },
  roomId: { roomid: Number, type: String },
});

export default mongoose.models.ActiveRoom ||
  mongoose.model("ActiveRoom", activeroomSchema);
