'use strict';

import BaseJoi    from 'joi';
import Extension  from 'joi-date-extensions';
const Joi = BaseJoi.extend(Extension);

export const createSerieValidation = {
  body: {
    first_air_date: Joi.date().format('YYYY-MM-DD').required(),
    last_air_date: Joi.date().format('YYYY-MM-DD').required(),
    original_language: Joi.string().required(),
    original_name: Joi.string().required(),
    overview: Joi.string().required(),
    popularity: Joi.number().precision(2).required().positive().min(0).max(100)
  }
}

export const updateSerieValidation = {
  body: {
    first_air_date: Joi.date().format('YYYY-MM-DD'),
    last_air_date: Joi.date().format('YYYY-MM-DD'),
    original_language: Joi.string(),
    original_name: Joi.string(),
    overview: Joi.string(),
    popularity: Joi.number().precision(2).positive().min(0).max(100)
  }
}
