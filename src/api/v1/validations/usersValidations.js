'use strict';

import Joi from 'joi';

export const createUserValidation = {
  body: {
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}

export const authenticateUserValidation = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}
