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
            if(!season) return res.status(404).jsonp({error: 'Resource not found', status: 404})
            return res.jsonp(season)
         })
         .catch(error => { return res.status(500).jsonp(error) });
}

function createSeason(req, res, next) {
  const dataSeason = {
    air_date: req.body.air_date || null,
    id_serie: req.body.id_serie || null,
    season_number: req.body.season_number || null,
    overview: req.body.overview || null,
  }

  seasonsServices.createSeason(dataSeason)
                 .then(seasonAdd => { return res.jsonp({code:200, message: "Season successfully created."}) })
                 .catch((err) => { return res.status(500).jsonp({code:500, message: err.message}) });
}

function updateSeason(req, res, next) {
  seasonsServices.updateSeason(req.params.id, req.body)
                 .then(seasonUpdate => {
                    return res.jsonp({code:200, message: "Season successfully updated."})
                  })
                 .catch((err) => {
                    return res.status(500).jsonp({ status_code: 500, message: err })
                });
}

function deleteSeason(req, res, next) {
  seasonsServices.deleteSeason(req.params.id)
                .then(season => { return res.jsonp({ message: 'Season successfully deleted'}) })
                .catch(err => { return res.status(500).jsonp(err) })
}

export default seasonsController;
