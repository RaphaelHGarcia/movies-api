'use strict'

import express from 'express';
import seasonsController from '../controllers/seasonsController'

const router = express.Router();

router.get('/', seasonsController.getAllSeason);
router.get('/details/:id', seasonsController.getSeasonById);
router.post('/create', seasonsController.createSeason);
router.put('/update/:id', seasonsController.updateSeason);
router.delete('/delete/:id', seasonsController.deleteSeason);

module.exports = router;
