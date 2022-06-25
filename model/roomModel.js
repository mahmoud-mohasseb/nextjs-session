import mongoose from "mongoose";
import validator from "validator";

const roomSchema = mongoose.Schema({
  AdminEmail: {
    AdminEmail: String,
    type: String,
  },
  roomId: { roomid: Number, type: String },
  // invitedEmails: { type: [String] },
  users: { type: [Array] },
  // message: {
  //   text: { type: String, required: true },
  // },

  // emails: {
  //   type: String,
  // },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
