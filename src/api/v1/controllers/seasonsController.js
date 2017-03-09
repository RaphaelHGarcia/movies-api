'use strict';

import seasonsServices from '../services/seasonsServices';
import helpers         from '../helpers/validate';

const seasonsController = {
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonById,
  getAllSeason
}

function getAllSeason(req, res, next) {
  seasonsServices.getAllSeason(req.query.page)
         .then(season => {
            return res.jsonp(season)
         })
         .catch(error => { return res.status(500).jsonp(error) });
}

function getSeasonById(req, res, next) {
  seasonsServices.getSeasonById(req.params.id)
         .then(season => {
            if(!season) return res.status(404).jsonp({ status_code: 404, error: 'Season not found'})
            return res.jsonp(season)
         })
         .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
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
                 .then(seasonAdd => res.jsonp({status_code: 200, message: "Season successfully created."}))
                 .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

function updateSeason(req, res, next) {
  seasonsServices.updateSeason(req.params.id, req.body)
                 .then(seasonUpdate => res.jsonp({code:200, message: "Season successfully updated."}))
                 .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

function deleteSeason(req, res, next) {
  seasonsServices.deleteSeason(req.params.id)
                .then(season => res.jsonp({status_code: 200, message: 'Season successfully deleted'}))
                .catch(err => res.status(500).jsonp({status_code: 500, message: 'Internal server Error.'}));
}

export default seasonsController;
