import express from "express";
const router = express.Router();
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import getGroqAPIResponse from "../utils/GroqAPIResponse.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import mongoose from "mongoose";



//middlewares
//check if user is logged in
router.use(isLoggedIn);
//ROUTES-----------------------------
// 0-> initialize/create the chat at : POST api/chats
router.post("/chats", async (req, res) => {
  try {
    const newChat = new Chat({
      title: "New chat",
      owner: req.session.user_id,
    });
    const savedChat = await newChat.save();
    return res.status(200).json({ success: "ok", savedChat });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Chat not saved in DB!" });
  }
});

// 1 -> get all chats of logged in user  : GET /api/chats
router.get("/chats", async (req, res) => {
  try {
    const allChats = await Chat.find({owner: req.session.user_id}).sort({ updatedAt: -1 });
    return res.status(200).json({ allChats });
  } catch (error) {
    return res.status(500).json({ error: "Chats not fetched from DB!" });
  }
});

// 2-> get particular chat messages of logged in user  at : GET api/chat/:chatId

router.get("/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(404).json({ success: false, msg: "Chat not found !" });
    }
    //find all messages that belongs to this chat
    const chat = await Chat.findOne({ _id: chatId ,owner: req.session.user_id});
    if (!chat) {
      return res.status(404).json({ success: false, msg: "Chat not found !" });
    }
    const allMessageOfChat = await Message.find({ belongToChatId: chatId ,owner: req.session.user_id});

    return res.json({ messages: allMessageOfChat });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Chat not found!" });
  }
});

// 3-> delete chat at : DELETE api/chat/:chatId
router.delete("/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(404).json({ success: false, msg: "Chat not found !" });
    }
    const deletedChat = await Chat.findOneAndDelete({ _id: chatId ,owner: req.session.user_id});

    if(!deletedChat){
      return res.status(404).json({ error: "Chat not found to delete" });
    }
    //Messages inside chat also need to be deleted
    const deletedMessages = await Message.deleteMany({
      belongToChatId: chatId,
      owner: req.session.user_id
    });
    
    return res.status(200).json({ status: "ok", deletedChat: deletedChat });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to delete chat" });
  }
});

//4-> start messaging and get response from assistant inside particular chat : POST api/chat/:chatId
router.post("/chats/:chatId", async (req, res) => {
  const { message,model="llama-3.3-70b-versatile" } = req.body;
  const { chatId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(404).json({ success: false, msg: "Chat not found !" });
  }
  if (!message) {
    return res.status(400).json({ success: false, msg: "Missing message field !" });
  }
  try {

    //check if chat exists
    const chat = await Chat.findOne({ _id: chatId, owner: req.session.user_id });
    if (!chat) {
      return res.status(404).json({ success: false, msg: "Chat not found" });
    }
    //create new message by user
    const userMessage = new Message({
      content: message,
      belongToChatId: chatId,
      owner: req.session.user_id,
      role: "user",
    });
    //get reply of user message from Assistant (groq model)
    const replyFromAssistant = await getGroqAPIResponse({message,model});
    const assistantMessage = new Message({
      content: replyFromAssistant,
      belongToChatId: chatId,
      owner: req.session.user_id,
      role: "assistant",
    });
    await userMessage.save();
    await assistantMessage.save();
    return res.status(201).json({
      success: true,
      replyBy: "assistant",
      response: assistantMessage.content,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Message is not created or assistant not responded !" });
  }
});

//5-> Update chat title at : PATCH /api/chats/:chatId
router.patch("/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { title } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(404).json({ success: false, msg: "Chat not found !" });
    }
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId ,owner: req.session.user_id},
      { title },
      { returnDocument: "after" },
    );
    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found to update" });
    }
    return res.status(200).json({ success: "ok", updatedChat });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to update chat" });
  }
});

export default router;
