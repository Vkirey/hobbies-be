import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
    name: Joi.string().required(),
    hobbies: Joi.array()
});

export const updateUserModel = Joi.object().keys({
    name: Joi.string(),
    hobbies: Joi.array()
});