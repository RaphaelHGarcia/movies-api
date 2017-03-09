'use strict';

import seasonsServices from '../services/seasonsServices';
import helpers         from '../helpers/validate';
import redisService  from '../config/redis';

const seasonsController = {
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonById,
  getAllSeason
}

function getAllSeason(req, res, next) {
  const keyRedis = 'seasons:page='+req.query.page;
  const fetchNewData = () => {
    seasonsServices.getAllSeason(req.query.page)
         .then(season => {
           redisService.client.setex(keyRedis, redisService.time, JSON.stringify(season));
            return res.jsonp(season)
         })
         .catch(error => { return res.status(500).jsonp(error) });
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData()
    return res.jsonp(JSON.parse(result))
  });
}

function getSeasonById(req, res, next) {
  const keyRedis = 'seasons:id='+req.query.id;
  const fetchNewData = () => {
    seasonsServices.getSeasonById(req.params.id)
         .then(season => {
            if(!season) return res.status(404).jsonp({ status_code: 404, error: 'Season not found'})
            redisService.client.setex(keyRedis, redisService.time, JSON.stringify(season));
            return res.jsonp(season)
         })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData()
    return res.jsonp(JSON.parse(result))
  });
}

function createSeason(req, res, next) {
  const dataSeason = {
    air_date: req.body.air_date || null,
    id_serie: req.body.id_serie || null,
    season_number: req.body.season_number || null,
    overview: req.body.overview || null,
  }

  if(!helpers.verifyDateIsValid(dataSeason.air_date, 'YYYY-MM-DD')) return res.status(400).jsonp({status_code: 400, message: 'Air date has the invalid format.'})

  seasonsServices.createSeason(dataSeason)
                 .then(seasonAdd => {
                   redisService.client.remove('seasons:*')
                   res.jsonp({status_code: 200, message: "Season successfully created."})
                  })
                 .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

function updateSeason(req, res, next) {
  seasonsServices.updateSeason(req.params.id, req.body)
                 .then(seasonUpdate => {
                   redisService.client.remove('seasons:*')
                   res.jsonp({code:200, message: "Season successfully updated."})
                  })
                 .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

function deleteSeason(req, res, next) {
  seasonsServices.deleteSeason(req.params.id)
                .then(season => {
                  redisService.client.remove('seasons:*')
                  res.jsonp({status_code: 200, message: 'Season successfully deleted'})
                })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

export default seasonsController;
