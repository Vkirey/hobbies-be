import * as Joi from "joi";

export const createHobbyModel = Joi.object().keys({
  passionLevel: Joi.string(),
  name: Joi.string().required(),
  year: Joi.number()
});

export const updateHobbyModel = Joi.object().keys({
  passionLevel: Joi.string(),
  name: Joi.string().required(),
  year: Joi.number()
});
