'use strict';

import BaseJoi   from 'joi';
import Extension from 'joi-date-extensions';
const Joi = BaseJoi.extend(Extension);

export const createEpisodeValidation = {
  body: {
     air_date: Joi.date().format('YYYY-MM-DD').required(),
     id_season: Joi.number().integer().required().positive(),
     season_number: Joi.number().integer().required().positive(),
     episode_number:Joi.number().integer().required().positive().min(1),
     overview: Joi.string().required(),
     name: Joi.string().required()
  }
}

export const updateEpisodeValidation = {
  body: {
     air_date: Joi.date().format('YYYY-MM-DD'),
     id_season: Joi.number().integer().positive(),
     season_number: Joi.number().integer().positive(),
     episode_number:Joi.number().integer().positive().min(1),
     overview: Joi.string(),
     name: Joi.string()
  }
}
