import Joi from "joi";
import { IExplore } from "../model/UserProfileModel";

export const userProfileValidation = Joi.object({
    name: Joi.string().required(),
    designation: Joi.string().required(),
    instagramLink: Joi.string().required(),
    gitLink: Joi.string().required(),
    linkedInLink: Joi.string().required(),
    description: Joi.string().required(),
    aboutMe: Joi.string().required(),
    explore: Joi.array<IExplore>().required(),
    email: Joi.string().required(),
    phoneNo: Joi.string().required(),
});