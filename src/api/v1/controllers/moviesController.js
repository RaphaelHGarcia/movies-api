'use strict';

import moviesServices from '../services/moviesServices';
import helpers        from '../helpers/validate';
import redisService   from '../config/redis';

const moviesController = {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById
}

function getAllMovies(req, res, next) {
  const keyRedis = 'movies:page='+req.query.page+'&search='+req.query.search;
  const fetchNewData = () => {
    moviesServices.getAllMovies(req.query.page, req.query.search)
                .then(getAllMovies => {
                    redisService.client.setex(keyRedis, redisService.time, JSON.stringify(getAllMovies));
                    res.jsonp(getAllMovies);
                  })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server error.'}));
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData();
    return res.jsonp(JSON.parse(result));
  });
}

function getMovieById(req,res, next) {
  const keyRedis = 'movies:id='+req.params.id;
  const fetchNewData = () => {
    moviesServices.getMovieById(req.params.id)
    .then(movie => {
      if(!movie) return res.status(404).jsonp({status_code: 404, message: 'Resource not found'});
      redisService.client.setex(keyRedis, redisService.time, JSON.stringify(movie));
      return res.jsonp(movie);
    })
    .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server error.'}));
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData();
    return res.jsonp(JSON.parse(result));
  });
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
                .then(movieAdd =>  {
                  redisService.client.remove('movies:*');
                  res.jsonp({status_code: 200, message: 'Movie successfully created.'});
                })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a movie.'}));
}

function updateMovie(req, res, next) {
  const id = req.params.id;
  const dataMovie = req.body;

  if(!parseInt(id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to movie.'});

  moviesServices.updateMovie(id, dataMovie)
                .then(movieUpdate => {
                  redisService.client.remove('movies:*');
                  return res.jsonp({status_code: 200, message: 'Movie successfully Update.'});
                })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to update a movie.'}));
}

function deleteMovie(req, res, next) {
  if(!parseInt(req.params.id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to movie.'});
  moviesServices.deleteMovie(req.params.id)
                .then(movieDelete => {
                  redisService.client.remove('movies:*');
                  res.jsonp({status_code: 200, message: 'Movie successfully Delete.'});
                })
                .catch((err) => { res.status(500).jsonp({status_code: 500, message: 'Failed to delete a movie.'}) });
}

export default moviesController;
