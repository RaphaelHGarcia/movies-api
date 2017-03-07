'use strict'

/**
 * @swagger
 * resourcePath: /api/
 * description: All endpoints
 */

import express from 'express';
import moviesController from '../controllers/moviesController'

const router = express.Router();


router.post('/create', moviesController.createMovie);
router.put('/update/:id', moviesController.updateMovie);
router.delete('/delete/:id', moviesController.deleteMovie);

module.exports = router;
