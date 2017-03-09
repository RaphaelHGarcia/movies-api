'use strict';

import seriesServices from '../services/seriesServices';
import helpers        from '../helpers/validate';

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

  seriesServices.getAllSeries(page, search).then(listOfTvSeries => {
    return res.jsonp(listOfTvSeries)
  }).catch(error => {
    return res.status(500).jsonp({
      body: error,
      status: 500,
      message: error.message
    })
  })
}

function getSerieById(req,res, next) {
  seriesServices.getSerieById(req.params.id).then(serie => {
    if(!serie) return res.status(404).jsonp({error: 'Resource not found', status: 404})
    return res.jsonp(serie)
  }).catch(error => {
    return res.status(500).jsonp(error)
  })
}

function createSerie (req, res, next) {
  const dataSerie = {
    first_air_date: req.body.first_air_date || null,
    last_air_date: req.body.last_air_date || null,
    original_language: req.body.original_language || null,
    original_name: req.body.original_name || null,
    overview: req.body.overview || null,
    popularity: req.body.popularity || null,
  }

  seriesServices.createSerie(dataSerie)
                .then(serieAdd => { return res.jsonp(serieAdd) })
                .catch(error => { return res.status(500).jsonp({ body: error, status: 500 }) });
}

function updateSerie(req, res, next) {
  if(dataSerie.number_of_seasons) return res.status(400).jsonp({error: 'You can`t update number of season'});
  if(dataSerie.number_of_episodes) return res.status(400).jsonp({error: 'You can`t update number of episodes'});
  if(dataSerie.created_at) return res.status(400).jsonp({error: 'You can`t update created_at'});

  seriesServices.updateSerie(req.params.id, req.body)
                .then(serieUpdate => { return res.jsonp(serieUpdate) })
                .catch(err => { return res.status(500).jsonp({ body: err, status: 500 }) });
}

function deleteSerie(req, res, next) {
  seriesServices.deleteSerie(req.params.id)
                .then(serieDelete => { return res.jsonp(serieDelete) })
                .catch(err => { return res.status(500).jsonp({ body: err, status: 500 }) });
}

export default seriesController;
