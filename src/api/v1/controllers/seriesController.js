'use strict';

import seriesServices from '../services/seriesServices';
import helpers        from '../helpers/validate';
import redisService   from '../config/redis';

const seriesController = {
  createSerie,
  updateSerie,
  deleteSerie,
  getAllSeries,
  getSerieById
}

function getAllSeries(req, res, next){
  const page = req.query.page;
  const search = req.query.search;
  const keyRedis = 'series:page='+req.query.page+'&search='+req.query.search;

  const fetchNewData = () => {
    seriesServices.getAllSeries(page, search)
                  .then(listOfTvSeries => {
                    redisService.client.setex(keyRedis, redisService.time, JSON.stringify(listOfTvSeries));
                    return res.jsonp(listOfTvSeries);
                  })
                  .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData();
    return res.jsonp(JSON.parse(result));
  });
}

function getSerieById(req,res, next) {
  const keyRedis = 'series:id='+req.params.id;
  const fetchNewData = () => {
    seriesServices.getSerieById(req.params.id)
                .then(serie => {
                  if(!serie) return res.status(404).jsonp({status_code: 404, message: 'Serie not found.'});
                  redisService.client.setex(keyRedis, redisService.time, JSON.stringify(serie));
                  return res.jsonp(serie);
                })
                .catch(error => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
  }

  redisService.client.get(keyRedis, (err, result) => {
    if(err || !result) return fetchNewData();
    return res.jsonp(JSON.parse(result));
  });
}

function createSerie (req, res, next) {
  const dataSerie = {
    first_air_date: req.body.first_air_date,
    last_air_date: req.body.last_air_date,
    original_language: req.body.original_language,
    original_name: req.body.original_name,
    overview: req.body.overview,
    popularity: req.body.popularity
  }

  seriesServices.createSerie(dataSerie)
                .then(serieAdd => {
                  redisService.client.remove('series:*');
                  res.jsonp({status_code: 200, message: 'Serie successfully created.'});
                })
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

function updateSerie(req, res, next) {
  if(!parseInt(req.params.id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to serie.'});
  if(req.body.number_of_seasons) return res.status(400).jsonp({error: 'You can`t update number of season'});
  if(req.body.number_of_episodes) return res.status(400).jsonp({error: 'You can`t update number of episodes'});
  if(req.body.created_at) return res.status(400).jsonp({error: 'You can`t update created_at'});

  seriesServices.updateSerie(req.params.id, req.body)
                .then(serieUpdate => {
                  redisService.client.remove('series:*');
                  res.jsonp({ status_code: 200, message: 'Serie successfully updated.' });
                })
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

function deleteSerie(req, res, next) {
  if(!parseInt(req.params.id)) return res.status(400).jsonp({status_code: 400, message: 'Invalid id to serie.'});
  seriesServices.deleteSerie(req.params.id)
                .then(serieDelete => {
                  redisService.client.remove('series:*');
                  res.jsonp({status_code: 200, message: 'Serie successfully deleted.'});
                })
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

export default seriesController;
