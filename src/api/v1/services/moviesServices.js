'use strict';

import Movie    from '../models/movies';
import Promisse from 'bluebird';

const moviesServices = {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById
}

function getAllMovies(page = 1, term = null) {
  return new Promise((resolve, reject) => {
    Movie.forge()
         .query((db) => {
            if(term) db.where('movies.original_title', 'like', `%${term}%`);
         })
         .orderBy('popularity', 'desc')
         .fetchPage({page: page, pageSize: 10})
         .then(obj => resolve(obj))
         .catch(err => reject(err));
  });
}

function getMovieById(id) {
  return new Promisse((resolve, reject) => {
    Movie.where({id})
         .fetch()
         .then(getMovieById => resolve(getMovieById))
         .catch(err => reject(err));
  });
}

function createMovie(movieData) {
  return new Promisse((resolve, reject) => {
    Movie.forge(movieData)
         .save()
         .then(movieAdd => resolve(movieAdd))
         .catch(err => reject(err));
  });
}

function updateMovie(id, movieData) {
  return new Promisse((resolve, reject) => {
    Movie.forge({ id })
         .save(movieData, {patch: true})
         .then(movie => resolve(movie))
         .catch(error => reject(error));
  });
}

function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    Movie.where({ id })
         .destroy()
         .then(movieDelete => resolve(movieDelete))
         .catch(err => reject(err));
  });
}

export default moviesServices;
