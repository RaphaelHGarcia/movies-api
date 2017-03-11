'use strict';

import BaseJoi   from 'joi';
import Extension from 'joi-date-extensions';
const Joi = BaseJoi.extend(Extension);

export const createMovieValidation = {
  body: {
    original_language: Joi.string().required(),
    original_title: Joi.string().required(),
    overview: Joi.string().required(),
    release_date: Joi.date().format('DD/MM/YYYY').required(),
    runtime: Joi.number().integer().required().positive(),
    popularity: Joi.number().precision(2).required().positive().min(0).max(100),
    tagline: Joi.string().required(),
    directed_by: Joi.string().required(),
    screenplay_by: Joi.string().required(),
    starred_by: Joi.string().required()
  }
}

export const updateMovieValidation = {
  body: {
    original_language: Joi.string(),
    original_title: Joi.string(),
    overview: Joi.string(),
    release_date: Joi.date().format('DD/MM/YYYY'),
    runtime: Joi.number().integer().positive(),
    popularity: Joi.number().precision(2).positive().min(0).max(100),
    tagline: Joi.string(),
    directed_by: Joi.string(),
    screenplay_by: Joi.string(),
    starred_by: Joi.string()
  }
}
