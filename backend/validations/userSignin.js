import Joi from "joi";

const signinValidator = Joi.object({
  email: Joi.string().min(4).email().required(),
  password: Joi.string().min(1).required(),
  phoneNumber: Joi.string().min(10).required(),
});

export default signinValidator;
