'use strict';

import Serie from '../models/series';
import Promisse from 'bluebird';

const seriesServices = {
  createSerie,
  updateSerie,
  deleteSerie,
  getSerieById,
  getAllSeries,
  incrementSeasonToSerieById,
  decrementSeasonToSerieById,
  incrementEpisodeToSerieById
}

function getAllSeries(page = 1, term = null){
  return new Promise((resolve, reject) => {
    Serie.forge()
      .query((db) => {
        if(term) db.where('series.original_name', 'like', `%${term}%`);
      })
      .orderBy('popularity', 'desc')
      .fetchPage({ page: page, withRelated: ['seasons']})
      .then((getAllSeries) => {
        resolve(getAllSeries)
    }).catch(error => {
      reject(error)
    })
  })
}

function createSerie(serieData) {
  return new Promise((resolve, reject) => {
    Serie.forge(serieData)
            .save()
            .then(serieAdd => { resolve(serieAdd) })
            .catch(err => { reject(err) });
  });
}

function updateSerie(id, serieData) {
  return new Promise((resolve, reject) => {
    Serie.forge({ id })
         .save(serieData, {patch: true})
         .then((serieUpdate) => { resolve(serieUpdate) })
         .catch(err => { reject(err) });
  });
}

function deleteSerie(id) {
  return new Promise((resolve, reject) => {
    Serie.where({ id })
         .destroy()
         .then((serieDelete) => { resolve(serieDelete) })
         .catch(err => { reject(err) });
  });
}

function getSerieById(id) {
  return new Promisse((resolve, reject) => {
    Serie.where({id})
         .fetch({withRelated: ['seasons']})
         .then(getSerieById => {
           if(!getSerieById) reject({message: 'Serie not found'});
           resolve(getSerieById) ;
         })
         .catch((err) => { reject(err) });
  });
}

function incrementSeasonToSerieById(id){
  return new Promisse((resolve, reject) => {
    getSerieById(id)
        .then(serie => {
           serie.save({number_of_seasons: serie.toJSON().number_of_seasons + 1 });
         });
  });
}

function decrementSeasonToSerieById(id){
  return new Promisse((resolve, reject) => {
    getSerieById(id)
        .then(serie => {
           serie.save({number_of_seasons: serie.toJSON().number_of_seasons - 1 });
         });
  });
}

function incrementEpisodeToSerieById(id){
  return new Promisse((resolve, reject) => {
    getSerieById(id)
        .then(serie => {
           serie.save({number_of_episodes: serie.toJSON().number_of_episodes + 1 });
         });
  });
}

export default seriesServices;
