'use strict'

import express            from 'express';
import episodesController from '../controllers/episodesController';
import securityHelper     from '../helpers/security';
import validation         from 'express-validation';
import {
        createEpisodeValidation,
        updateEpisodeValidation
} from '../validations/episodesValidations';

const router = express.Router();

/**
 * @swagger
 * /api/v1/episodes/create:
 *   post:
 *     tags:
 *       - Episodes
 *     description: Endpoint create an episode
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: air_date
 *         description: Air date to episode.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: id_season
 *         description: Id season to episode.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: episode_number
 *         description: Id number to episode.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: overview
 *         description: Overview to episode.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: Name to episode.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Create episode success
 *       500:
 *         description: Fail create episode
 */
router.post('/create', validation(createEpisodeValidation), securityHelper.isAuthenticated, episodesController.createEpisode);

/**
 * @swagger
 * /api/v1/episodes/update/{id}:
 *   put:
 *     tags:
 *       - Episodes
 *     description: Endpoint update an episode
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: Air date to episode.
 *         in: path
 *         type: integer
 *         required: true
 *       - name: air_date
 *         description: Air date to episode.
 *         in: formData
 *         type: string
 *       - name: id_season
 *         description: Id season to episode.
 *         in: formData
 *         type: integer
 *       - name: episode_number
 *         description: Id number to episode.
 *         in: formData
 *         type: integer
 *       - name: overview
 *         description: Overview to episode.
 *         in: formData
 *         type: string
 *       - name: name
 *         description: Name to episode.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Create episode success
 *       500:
 *         description: Fail create episode
 */
router.put('/update/:id', validation(updateEpisodeValidation), securityHelper.isAuthenticated, episodesController.updateEpisode);

/**
 * @swagger
 * /api/v1/episodes/delete/{id}:
 *   delete:
 *     tags:
 *       - Episodes
 *     description: Endpoint delete an episode
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: id to episode.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Delete episode success
 *       500:
 *         description: Fail delete episode
 */
router.delete('/delete/:id', securityHelper.isAuthenticated, episodesController.deleteEpisode);

module.exports = router;
