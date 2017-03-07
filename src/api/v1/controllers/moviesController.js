'use strict';

import moviesServices from '../services/moviesServices';
import helpers        from '../helpers/validate';

const moviesController = {
  createMovie,
  updateMovie,
  deleteMovie
}

function createMovie (req, res, next) {
  const dataMovie = {
    original_language: req.body.original_language || null,
    original_title: req.body.original_title || null,
    overview: req.body.overview || null,
    release_date: req.body.release_date || null,
    runtime: req.body.runtime || null,
    popularity: req.body.popularity || null,
    tagline: req.body.tagline || null,
    directed_by: req.body.directed_by || null,
    screenplay_by: req.body.screenplay_by || null,
    starred_by: req.body.starred_by || null,
  }

  moviesServices.createMovie(dataMovie)
                .then(movieAdd => { return res.jsonp(movieAdd)})
                .catch((err) => {return res.status(500).jsonp(err)})
}

function updateMovie(req, res, next) {
  const id = req.params.id;
  const dataMovie = req.body;

  moviesServices.updateMovie(id, dataMovie)
                .then(movieUpdate => { return res.jsonp(movieUpdate) })
                .catch((err) => { return res.status(500).jsonp(err) })
}

function deleteMovie(req, res, next) {
  const id = req.params.id;

  moviesServices.deleteMovie(id)
                .then(movieDelete => { res.jsonp(movieDelete) })
                .catch((err) => { res.status(500).jsonp(err) })
}

export default moviesController;
