import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Anonymous Chat",
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
