import Joi from "joi";

export const createProject = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    technology: Joi.array<string>(),
    gitHubLink: Joi.string().allow(null, ''),
    liveLink: Joi.string().allow(null, ''),
});