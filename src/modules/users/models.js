import joi from 'joi';

const model = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  userEmail: joi.string().email().required(),
  password: joi.string().required(),
});

export const modelForUpdate = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  password: joi.string(),
});

export default model;
