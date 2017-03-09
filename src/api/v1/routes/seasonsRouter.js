'use strict'

import express from 'express';
import seasonsController from '../controllers/seasonsController'
import securityHelper from '../helpers/security';

const router = express.Router();

/**
 * @swagger
 * /api/v1/seasons:
 *   get:
 *     tags:
 *       - TV Seasons
 *     description: Endpoint list all seasons.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Paginate Seasons list.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: list seasons
 *       500:
 *         description: Internal server Error
 */
router.get('/', seasonsController.getAllSeason);

/**
 * @swagger
 * /api/v1/seasons/details/{id}:
 *   get:
 *     tags:
 *       - TV Seasons
 *     description: Endpoint get season by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id to Season.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get season by id;
 *       500:
 *         description: Internal server Error
 */
router.get('/details/:id', seasonsController.getSeasonById);

/**
 * @swagger
 * /api/v1/seasons/create:
 *   post:
 *     tags:
 *       - TV Seasons
 *     description: Endpoint to create a season
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: air_date
 *         description: Air date to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: id_serie
 *         description: id to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: season_number
 *         description: id to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: overview
 *         description: Overview to serie.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Create season success
 *       500:
 *         description: Fail create season
 */
router.post('/create', securityHelper.isAuthenticated, seasonsController.createSeason);

/**
 * @swagger
 * /api/v1/seasons/update/{id}:
 *   put:
 *     tags:
 *       - TV Seasons
 *     description: Endpoint to create a season
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: Id to season.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: air_date
 *         description: Air date to serie.
 *         in: formData
 *         type: string
 *       - name: id_serie
 *         description: id to serie.
 *         in: formData
 *         type: string
 *       - name: season_number
 *         description: id to serie.
 *         in: formData
 *         type: string
 *       - name: overview
 *         description: Overview to serie.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Create season success
 *       500:
 *         description: Fail create season
 */
router.put('/update/:id', securityHelper.isAuthenticated, seasonsController.updateSeason);

/**
 * @swagger
 * /api/v1/seasons/delete/{id}:
 *   delete:
 *     tags:
 *       - TV Seasons
 *     description: Endpoint delete a season
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: id to season.
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Delete season success
 *       500:
 *         description: Fail delete season
 */
router.delete('/delete/:id', securityHelper.isAuthenticated, seasonsController.deleteSeason);

module.exports = router;
