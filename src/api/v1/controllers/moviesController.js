'use strict';

import moviesServices from '../services/moviesServices';
import helpers        from '../helpers/validate';

const moviesController = {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById
}

function getAllMovies(req, res, next) {
  moviesServices.getAllMovies(req.query.page, req.query.search)
                .then(getAllMovies => res.jsonp(getAllMovies))
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server error.'}));
}

function getMovieById(req,res, next) {
  moviesServices.getMovieById(req.params.id)
                .then(movie => {
                  if(!movie) return res.status(404).jsonp({status_code: 404, message: 'Resource not found'})
                  return res.jsonp(movie)
                })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server error.'}));
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

  if(!helpers.verifyDateIsValid(dataMovie.release_date, 'YYYY-MM-DD')) return res.status(400).jsonp({status_code: 400, message: 'Release date has the invalid format.'})

  moviesServices.createMovie(dataMovie)
                .then(movieAdd =>  res.jsonp({status_code: 200, message: 'Movie successfully created.'}))
                .catch((err) => res.status(500).jsonp({status_code: 500, message: 'Failed to create a movie.'}));
}

function updateMovie(req, res, next) {
  const id = req.params.id;
  const dataMovie = req.body;

  if(req.body.release_date){
    if(!helpers.verifyDateIsValid(req.body.release_date, 'YYYY-MM-DD')) return res.status(400).jsonp({status_code: 400, message: 'Release date has the invalid format.'})
  }

  moviesServices.updateMovie(id, dataMovie)
                .then(movieUpdate => { return res.jsonp({status_code: 200, message: 'Movie successfully Update.'}) })
                .catch((err) => { return res.status(500).jsonp({status_code: 500, message: 'Failed to create a movie.'}) })
}

function deleteMovie(req, res, next) {
  moviesServices.deleteMovie(req.params.id)
                .then(movieDelete => { res.jsonp({status_code: 200, message: 'Movie successfully Delete.'}) })
                .catch((err) => { res.status(500).jsonp({status_code: 500, message: 'Failed to delete a movie.'}) })
}

export default moviesController;
