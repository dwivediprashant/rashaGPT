import express from "express";
const router = express.Router();
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import getGroqAPIResponse from "../utils/GroqAPIResponse.js";

//ROUTES-----------------------------
let count = 0;
// 0-> initialize/create the chat at : POST api/chats
router.post("/chats", async (req, res) => {
  try {
    count++;
    const newChat = new Chat({
      title: `New chat ${count}`, //to be change later
    });
    const savedChat = await newChat.save();
    res.status(200).json({ success: "ok", savedChat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Chat not saved in DB!" });
  }
});

// 1 -> get all chats at  : GET /api/chats
router.get("/chats", async (req, res) => {
  try {
    const allChats = await Chat.find({}).sort({ updatedAt: -1 });
    res.send(allChats);
  } catch (error) {
    res.status(500).json({ error: "Chats not fetched from DB!" });
  }
});

// 2-> get particular chat  at : GET api/chat/:chatId

router.get("/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  // console.log(chatId);
  try {
    //find all messages that belongs to this chat
    const allMessageOfChat = await Message.find({ belongToChatId: chatId });

    if (!allMessageOfChat) {
      res.status(404).json({ error: "This chat not started yet !" });
    }

    res.json({ messages: allMessageOfChat });
  } catch (error) {
    res.status(500).json({ error: "Required chat not fetched from DB!" });
  }
});

// 3-> delete chat at : DELETE api/chat/:chatId
router.delete("/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  // console.log(chatId);
  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId, {
      runValidators: true,
    });
    if (!deletedChat) {
      res.status(404).json({ error: "Chat not found to delete" });
    }
    res.status(200).json({ status: "ok", deletedChat: deletedChat });
  } catch (error) {
    res.status(500).json({ error: "failed to delete chat" });
  }
});

//4-> start messaging and get response from assistant inside particular chat : POST api/chat/:chatId
router.post("/chats/:chatId", async (req, res) => {
  const { message } = req.body;
  const { chatId } = req.params;
  // message = message.trim();
  if (!message) {
    res.status(400).json({ error: "Missing message field !" });
  }
  try {
    //create new message by user
    const userMessage = new Message({
      content: message,
      belongToChatId: chatId,
      role: "user",
    });
    //get reply of user message from Assistant (groq model)
    const replyFromAssistant = await getGroqAPIResponse(message);
    const assistantMessage = new Message({
      content: replyFromAssistant,
      belongToChatId: chatId,
      role: "assistant",
    });
    await userMessage.save();
    await assistantMessage.save();
    res.status(201).json({
      success: "ok",
      replyBy: "assistant",
      response: assistantMessage.content,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Message is not created or assistant not responded !" });
  }
});

export default router;
