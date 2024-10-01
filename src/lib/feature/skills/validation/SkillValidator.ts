import Joi from "joi";
import { LEARNING_TYPE, USING_NOW_TYPE } from "../../../core/config/string";

export const createSkill = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().allow(USING_NOW_TYPE, LEARNING_TYPE).required(),
    image: Joi.string().required(),
});