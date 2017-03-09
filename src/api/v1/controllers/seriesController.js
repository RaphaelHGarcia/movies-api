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

  seriesServices.getAllSeries(page, search)
                .then(listOfTvSeries => {
                    return res.jsonp(listOfTvSeries)
                })
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

function getSerieById(req,res, next) {
  seriesServices.getSerieById(req.params.id)
                .then(serie => {
                  if(!serie) return res.status(404).jsonp({status_code: 404, message: 'Serie not found.'})
                  return res.jsonp(serie)
                })
                .catch(error => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
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

  if(!helpers.verifyDateIsValid(dataSerie.first_air_date, 'YYYY-MM-DD')) return res.status(400).jsonp({status_code: 400, message: 'First air date has the invalid format.'})
  if(!helpers.verifyDateIsValid(dataSerie.last_air_date, 'YYYY-MM-DD')) return res.status(400).jsonp({status_code: 400, message: 'Last air date has the invalid format.'})

  seriesServices.createSerie(dataSerie)
                .then(serieAdd => res.jsonp({status_code: 200, message: 'Serie successfully created.'}))
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

function updateSerie(req, res, next) {
  if(req.body.number_of_seasons) return res.status(400).jsonp({error: 'You can`t update number of season'});
  if(req.body.number_of_episodes) return res.status(400).jsonp({error: 'You can`t update number of episodes'});
  if(req.body.created_at) return res.status(400).jsonp({error: 'You can`t update created_at'});

  seriesServices.updateSerie(req.params.id, req.body)
                .then(serieUpdate => res.jsonp({ status_code: 200, message: 'Serie successfully updated.' }))
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

function deleteSerie(req, res, next) {
  seriesServices.deleteSerie(req.params.id)
                .then(serieDelete => res.jsonp({status_code: 200, message: 'Serie successfully deleted.'}))
                .catch(err => res.json({status_code: 500, message: 'Internal server Error.'}));
}

export default seriesController;
