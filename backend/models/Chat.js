import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Anonymous Chat",
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
