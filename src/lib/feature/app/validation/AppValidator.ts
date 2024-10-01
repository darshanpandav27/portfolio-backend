import Joi from "joi";

export const contactUs = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string().required(),
    message: Joi.string().required(),
});