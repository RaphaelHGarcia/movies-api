'use strict';

import BaseJoi    from 'joi';
import Extension  from 'joi-date-extensions';
const Joi = BaseJoi.extend(Extension);

export const createSeasonValidation = {
  body: {
    air_date: Joi.date().format('YYYY-MM-DD').required(),
    id_serie: Joi.number().integer().required().positive(),
    season_number: Joi.number().integer().required().positive(),
    overview: Joi.string().required()
  }
}

export const updateSeasonValidation = {
  body: {
    air_date: Joi.date().format('YYYY-MM-DD'),
    id_serie: Joi.number().integer().positive(),
    season_number: Joi.number().integer().positive(),
    overview: Joi.string()
  }
}
