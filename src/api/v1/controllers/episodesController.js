'use strict';

import episodesServices from '../services/episodesServices';
import helpers         from '../helpers/validate';

const episodesController = {
  createEpisode,
  updateEpisode,
  deleteEpisode
}

function createEpisode(req, res, next) {
  const data = {
   air_date: req.body.air_date || null,
   season_number: 0,
   id_season: req.body.id_season || null,
   episode_number: req.body.episode_number || null,
   overview: req.body.overview || null,
   name: req.body.name || null,
 }
 
 if(!data.id_season) return res.status(400).jsonp({error: 'You should pass id_season'})
 episodesServices.createEpisode(data).then(episodeCreated => {
   return res.jsonp(episodeCreated)
 }).catch(error => {
   return res.status(500).jsonp({
     body: error,
     status: 500
   })
 })
}

function updateEpisode(req, res, next) {
  if(req.body.season_number) return res.status(400).jsonp({error: 'You can not update season_number filed'})
  episodesServices.updateEpisode(req.params.id, req.body)
         .then(episodeUpdate => { return res.jsonp(episodeUpdate) })
         .catch(err => { return res.status(500).jsonp(err) })
}

function deleteEpisode(req, res, next) {
  episodesServices.deleteEpisode(req.params.id)
         .then(episodeDelete => { return res.jsonp({ message: 'Episode successfully deleted' }) })
         .catch(err => { return res.status(500).jsonp(err) })
}

export default episodesController;
