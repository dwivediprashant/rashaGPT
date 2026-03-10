import express, { text } from "express";
const router = express.Router();
import isLoggedIn from "../middlewares/isLoggedIn.js";
import getTranslate from "../utils/getTranslate.js";
import allowedLangValidator from "../validations/allowedLang.js";
import Message from "../models/Message.js";
router.use(isLoggedIn);

/// 1-> translate text at : POST api/translate
router.post("/", async (req, res) => {
  const { error, value } = allowedLangValidator.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: "error", msg: error.details[0].message });
  }

  try {
    // Update the message with the translated text
    const message = await Message.findOne({
      _id: value.messageId,
      owner: req.session.user_id,
    });

    if (!message) {
      return res
        .status(404)
        .json({ success: "error", msg: "Message not found" });
    }

    const translatedText = await getTranslate({
      text: value.text,
      selectedLangCode: value.selectedLangCode,
    });

    message.translation = {
      lang: value.selectedLangCode,
      text: translatedText,
    };
    await message.save();

    res
      .status(200)
      .json({ success: "ok", translatedLang: value.selectedLangCode });
  } catch (error) {
    res.status(500).json({ success: "error", msg: "Internal server error" });
  }
});

router.patch("/", async (req, res) => {
  const { messageId } = req.body;
  if (!messageId) {
    return res.status(404).json({ success: "error", msg: "Message not found" });
  }

  const updatedMsgTranslation = await Message.findOneAndUpdate(
    { _id: messageId, owner: req.session.user_id },
    { translation: { lang: "", text: "" } },
    { returnDocument: "after" },
  );


  return res
    .status(200)
    .json({ success: "ok", msg: "Translation deleted successfully !" });
});

export default router;
