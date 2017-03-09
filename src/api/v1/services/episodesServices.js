'use strict';

import Episode   from '../models/episodes';
import seasonsServices  from '../services/seasonsServices';
import seriesServices  from '../services/seriesServices';
import Promisse from 'bluebird';

const episodesServices = {
  createEpisode,
  updateEpisode,
  deleteEpisode
}

function createEpisode(episodeData) {
  return new Promisse((resolve, reject) => {
    seasonsServices.getSeasonById(episodeData.id_season)
                   .then(season => {
                     Episode.forge(episodeData)
                            .save()
                            .then(episodeAdd => {
                               seasonsServices.incrementEpisodeToSeasonById(episodeAdd.get('id_season'));
                               seriesServices.incrementEpisodeToSerieById(season.get('id_serie'));
                               resolve(episodeAdd)
                             })
                            .catch((err) => { reject(err) });
    })
    .catch((err) => { reject(err) });
  });
}

function updateEpisode(id, episodeData) {
  return new Promise((resolve, reject) => {
    Episode.forge({ id })
    .save(episodeData, {patch: true})
    .then((episodeUpdate) => { resolve(episodeUpdate) })
    .catch(err => { reject(err) })
  })
}

function deleteEpisode(id) {
  return new Promise((resolve, reject) => {
    Episode.where({ id })
           .destroy()
           .then((episodeDelete) => { resolve(episodeDelete) })
           .catch(err => { reject(err) })
  })
}

export default episodesServices;
