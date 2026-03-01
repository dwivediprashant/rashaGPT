import Joi from "joi";

const signinValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default signinValidator;
