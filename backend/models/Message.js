import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  belongToChatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
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

const Message = mongoose.model("Message", messageSchema);

export default Message;
