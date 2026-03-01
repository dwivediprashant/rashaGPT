import Joi from "joi";

const signinValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default signinValidator;
