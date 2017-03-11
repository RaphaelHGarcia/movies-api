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
   air_date: req.body.air_date,
   season_number: req.body.season_number,
   id_season: req.body.id_season,
   episode_number: req.body.episode_number,
   overview: req.body.overview,
   name: req.body.name,
 }

 episodesServices.createEpisode(dataEpisode)
                 .then(episodeCreated => {
                   redisService.client.remove('series:*');
                   res.jsonp({status_code: 200, message: 'Episode successfully created.'});
                 })
                 .catch(err => {
                   if(err.code == 'ER_DUP_ENTRY') return res.status(500).jsonp({status_code: 500, message: 'Episode already exists.'});
                   res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'});
                 });
}

function updateEpisode(req, res, next) {
  if(req.body.season_number) return res.status(400).jsonp({status_code: 404, message: 'You can not update season_number filed'});
  if(!parseInt(req.params.id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to episode.'});
  episodesServices.updateEpisode(req.params.id, req.body)
         .then(episodeUpdate => {
           redisService.client.remove('series:*');
           res.jsonp({status_code: 200, message: 'Episode successfully updated.'});
          })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'}));
}

function deleteEpisode(req, res, next) {
  if(!parseInt(req.params.id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to episode.'});
  episodesServices.deleteEpisode(req.params.id)
         .then(episodeDelete => {
           redisService.client.remove('series:*');
           res.jsonp({status_code: 200, message: 'Episode successfully deleted.'})
         })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Failed to create a episode.'}));
}

export default episodesController;
