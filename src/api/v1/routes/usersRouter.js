'use strict'
import express from 'express';
import userController from '../controllers/userController'

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     tags:
 *       - Authenticate
 *     description: Endpoint authenticate user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Name user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password user.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Create user success
 *       500:
 *         description: Fail create user
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /api/v1/users/authenticate:
 *   post:
 *     tags:
 *       - Authenticate
 *     description: Endpoint authenticate user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password user.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get JWT success
 *       500:
 *         description: Fail get JWT
 */
router.post('/authenticate', userController.authenticate);


module.exports = router;
