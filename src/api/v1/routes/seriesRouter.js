'use strict'

import express from 'express';
import seriesController from '../controllers/seriesController';
import securityHelper from '../helpers/security';

const router = express.Router();

/**
 * @swagger
 * /api/v1/series:
 *   get:
 *     tags:
 *       - TV Series
 *     description: Endpoint list all series.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Paginate Series list.
 *         in: query
 *         type: string
 *       - name: search
 *         description: search Serie to title.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: list seasons
 *       500:
 *         description: Internal server Error
 */
router.get('/', seriesController.getAllSeries);

/**
 * @swagger
 * /api/v1/series/details/{id}:
 *   get:
 *     tags:
 *       - TV Series
 *     description: Endpoint get serie by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id to serie.
 *         required: true
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: list seasons
 *       500:
 *         description: Internal server Error
 */
router.get('/details/:id', seriesController.getSerieById);

/**
 * @swagger
 * /api/v1/series/create:
 *   post:
 *     tags:
 *       - TV Series
 *     description: Endpoint to create a serie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: first_air_date
 *         description: First air date to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: last_air_date
 *         description: Last air date to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: original_language
 *         description: Original language to serie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: original_name
 *         description: Original name to serie.
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
 *         description: Create serie success
 *       500:
 *         description: Fail create serie
 */
router.post('/create', securityHelper.isAuthenticated, seriesController.createSerie);

/**
 * @swagger
 * /api/v1/series/update/{id}:
 *   put:
 *     tags:
 *       - TV Series
 *     description: Endpoint to create a serie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: Id to serie.
 *         required: true
 *         in: formData
 *         type: integer
 *       - name: first_air_date
 *         description: First air date to serie.
 *         in: formData
 *         type: string
 *       - name: last_air_date
 *         description: Last air date to serie.
 *         in: formData
 *         type: string
 *       - name: original_language
 *         description: Original language to serie.
 *         in: formData
 *         type: string
 *       - name: original_name
 *         description: Original name to serie.
 *         in: formData
 *         type: string
 *       - name: overview
 *         description: Overview to serie.
 *         in: formData
 *         type: string
 *       - name: popularity
 *         description: Popularity to serie.
 *         in: formData
 *         type: number
 *     responses:
 *       200:
 *         description: Update serie success
 *       500:
 *         description: Fail update serie
 */
router.put('/update/:id', securityHelper.isAuthenticated, seriesController.updateSerie);

/**
 * @swagger
 * /api/v1/series/delete/{id}:
 *   delete:
 *     tags:
 *       - TV Series
 *     description: Endpoint delete a serie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: id to serie.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Delete serie success
 *       500:
 *         description: Fail delete serie
 */
router.delete('/delete/:id', securityHelper.isAuthenticated, seriesController.deleteSerie);

module.exports = router;
