
'use strict';

import Season   from '../models/seasons';
import seriesServices  from '../services/seriesServices';
import Promisse from 'bluebird';

const seasonsServices = {
  createSeason,
  updateSeason,
  deleteSeason,
  incrementEpisodeToSeasonById,
  getSeasonById,
  getAllSeason
}

function getAllSeason(page = 1) {
  return new Promisse((resolve, reject) => {
    Season.forge()
         .fetchPage({page: page, pageSize: 10, withRelated: ['episodes'], columns: ['*']})
         .then(getAllSeason => {
           console.log(getAllSeason);
           resolve(getAllSeason) ;
         })
         .catch((err) => { reject(err) });
  });
}

function createSeason(seasonData) {
  return new Promisse((resolve, reject) => {
    seriesServices.getSerieById(seasonData.id_serie)
      .then(serie => {
        Season.forge(seasonData)
              .save()
              .then(seasonAdd => {
                seriesServices.incrementSeasonToSerieById(seasonData.id_serie);
                resolve(seasonAdd)
              })
              .catch((err) => { reject(err) });
      })
      .catch((err) => { reject(err) });
  });
}

function updateSeason(id, seasonData) {
  return new Promise((resolve, reject) => {
    Season.forge({ id })
          .save(seasonData, {patch: true})
          .then((season) => { resolve(season) })
          .catch(error => { reject(error) });
  });
}

function deleteSeason(id) {
  return new Promise((resolve, reject) => {
    Season.where({ id })
          .fetch()
          .then((seasonDelete) => {
            seriesServices.decrementSeasonToSerieById(seasonDelete.get('id_serie'))
            .then(season => { resolve(season); })
            .catch((err) => {reject(err) });
            seasonDelete.destroy();
            resolve(seasonDelete)
          })
          .catch((err) => { reject(err) });
  });
}

function getSeasonById(id) {
  return new Promisse((resolve, reject) => {
    Season.where({id})
         .fetch({withRelated: ['episodes'], columns: ['*']})
         .then(getSeasonById => {
           if(!getSeasonById) reject({message: 'Season not found'});
           resolve(getSeasonById) ;
         })
         .catch((err) => { reject(err) });
  });
}

function incrementEpisodeToSeasonById(id){
  console.log('id service -> ',id);
  return new Promisse((resolve, reject) => {
    getSeasonById(id)
        .then(season => {
            console.log(season);
           season.save({episode_count: serie.toJSON().episode_count + 1 });
         });
  });
}

export default seasonsServices;
