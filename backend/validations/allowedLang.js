import Joi from "joi";

const allowedLanguageCodes = [
    "en-US", "as-IN", "bn-IN", "bgc-IN", "bho-IN", "bo-IN", "brx-IN", "ccp-IN",
    "doi-IN", "en-IO", "en-IN", "gu-IN", "hi-IN", "hi-Latn-IN", "kn-IN",
    "kok-Deva-IN", "kok-Latn-IN", "ks-Arab-IN", "ks-Deva-IN", "kxv-Deva-IN",
    "kxv-Latn-IN", "kxv-Orya-IN", "kxv-Telu-IN", "mai-IN", "ml-IN",
    "mni-Beng-IN", "mni-Mtei-IN", "mr-IN", "ne-IN", "or-IN", "pa-Guru-IN",
    "raj-IN", "sa-IN", "sat-Deva-IN", "sat-Olck-IN", "sd-Deva-IN", "ta-IN",
    "te-IN", "ur-IN", "xnr-IN"
];

const allowedLangValidator = Joi.object({
  text: Joi.string().required(),
  selectedLangCode: Joi.string().valid(...allowedLanguageCodes).required(),
  messageId: Joi.string().required(),
});

export default allowedLangValidator;