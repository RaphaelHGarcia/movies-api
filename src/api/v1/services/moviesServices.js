'use strict';

import Movie from '../models/movies';
import Promisse from 'bluebird';

const moviesServices = {
  createMovie,
  updateMovie,
  deleteMovie
}

function createMovie(movieData) {
  return new Promisse((resolve, reject) => {
    Movie.forge(movieData)
         .save()
         .then(movieAdd => { resolve(movieAdd) })
         .catch(err => { reject(err) });
  });
}

function updateMovie(id, movieData) {
  return new Promisse((resolve, reject) => {
    Movie.forge({ id })
         .save(movieData, {patch: true})
         .then((movie) => { resolve(movie) })
         .catch(error => { reject(error) })
  });
}

function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    Movie.where({ id })
         .destroy()
         .then((movieDelete) => { resolve(movieDelete) })
         .catch(err => { reject(err) })
  });
}

export default moviesServices;
