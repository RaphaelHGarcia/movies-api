'use strict'

import express from 'express';
import episodesController from '../controllers/episodesController'

const router = express.Router();

router.post('/create', episodesController.createEpisode);
router.put('/update/:id', episodesController.updateEpisode);
router.delete('/delete/:id', episodesController.deleteEpisode);

module.exports = router;
