'use strict'
import express from 'express';
import userController from '../controllers/userController'

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
