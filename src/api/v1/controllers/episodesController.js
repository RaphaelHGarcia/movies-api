'use strict';

import episodesServices from '../services/episodesServices';
import helpers          from '../helpers/validate';
import redisService     from '../config/redis';

const episodesController = {
  createEpisode,
  updateEpisode,
  deleteEpisode
}

function createEpisode(req, res, next) {
  const dataEpisode = {
   air_date: req.body.air_date || null,
   season_number: 0,
   id_season: req.body.id_season || null,
   episode_number: req.body.episode_number || null,
   overview: req.body.overview || null,
   name: req.body.name || null,
 }

 if(!dataEpisode.id_season) return res.status(400).jsonp({status_code: 404, message: 'You should pass id_season'})
 episodesServices.createEpisode(dataEpisode)
                 .then(episodeCreated => {
                   redisService.client.remove('series:*')
                   res.jsonp({status_code: 200, message: 'Episode successfully created.'})
                 })
                 .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'}));
}

function updateEpisode(req, res, next) {
  if(req.body.season_number) return res.status(400).jsonp({status_code: 404, message: 'You can not update season_number filed'})
  episodesServices.updateEpisode(req.params.id, req.body)
         .then(episodeUpdate => {
           redisService.client.remove('series:*')
           res.jsonp({status_code: 200, message: 'Episode successfully updated.'})
          })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'}));
}

function deleteEpisode(req, res, next) {
  episodesServices.deleteEpisode(req.params.id)
         .then(episodeDelete => {
           redisService.client.remove('series:*');
           res.jsonp({status_code: 200, message: 'Episode successfully deleted.'})
         })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'}));
}

export default episodesController;
