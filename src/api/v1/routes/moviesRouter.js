'use strict'

import express          from 'express';
import moviesController from '../controllers/moviesController';
import securityHelper   from '../helpers/security';
import validation       from 'express-validation';
import {
        createMovieValidation,
        updateMovieValidation
} from '../validations/moviesValidations';

const router = express.Router();

/**
 * @swagger
 * definition:
 *  MoviesList:
 *    properties:
 *      id:
 *        type: integer
 *      original_language:
 *        type: string
 *      original_title:
 *        type: string
 *      overview:
 *        type: string
 *      release_date:
 *        type: string
 *      runtime:
 *        type: integer
 *      popularity:
 *        type: number
 *      tagline:
 *        type: string
 *      directed_by:
 *        type: string
 *      screenplay_by:
 *        type: string
 *      starred_by:
 *        type: string
 */

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     tags:
 *       - Movies
 *     description: Endpoint list all movies.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Paginate movie list.
 *         in: query
 *         type: string
 *       - name: search
 *         description: Search movie to title.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: list movies
 *         schema:
 *           $ref: '#/definitions/MoviesList'
 *           type: array
 *       500:
 *         description: Internal server Error
 */

router.get('/' ,moviesController.getAllMovies);

/**
 * @swagger
 * /api/v1/movies/details/{id}:
 *   get:
 *     tags:
 *       - Movies
 *     description: Endpoint list all movies.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id to movie.
 *         in: path
 *         format: int64
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: list movies
 *         schema:
 *           $ref: '#/definitions/MoviesList'
 *           type: array
 *       500:
 *         description: Internal server Error
 */
router.get('/details/:id', moviesController.getMovieById);

/**
 * @swagger
 * /api/v1/movies/create:
 *   post:
 *     tags:
 *       - Movies
 *     description: Endpoint create a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: original_language
 *         description: Original language to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: original_title
 *         description: Original title to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: overview
 *         description: Description to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: release_date
 *         description: Releade date to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: runtime
 *         description: Runtime to movie.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: popularity
 *         description: Popularity to movie.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: tagline
 *         description: Tagline to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: directed_by
 *         description: Directed by to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: screenplay_by
 *         description: Screenplay by to movie.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: starred_by
 *         description: Starred by to movie.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Create movie success
 *       500:
 *         description: Fail create movie
 */
router.post('/create', validation(createMovieValidation) ,securityHelper.isAuthenticated, moviesController.createMovie);

/**
 * @swagger
 * /api/v1/movies/update/{id}:
 *   put:
 *     tags:
 *       - Movies
 *     description: Endpoint update a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: id to movie.
 *         in: path
 *         required: true
 *         type: integer
 *       - name: original_language
 *         description: Original language to movie.
 *         in: formData
 *         type: string
 *       - name: original_title
 *         description: Original title to movie.
 *         in: formData
 *         type: string
 *       - name: overview
 *         description: Description to movie.
 *         in: formData
 *         type: string
 *       - name: release_date
 *         description: Releade date to movie.
 *         in: formData
 *         type: string
 *       - name: runtime
 *         description: Runtime to movie.
 *         in: formData
 *         type: integer
 *       - name: popularity
 *         description: Popularity to movie.
 *         in: formData
 *         type: number
 *       - name: tagline
 *         description: Tagline to movie.
 *         in: formData
 *         type: string
 *       - name: directed_by
 *         description: Directed by to movie.
 *         in: formData
 *         type: string
 *       - name: screenplay_by
 *         description: Screenplay by to movie.
 *         in: formData
 *         type: string
 *       - name: starred_by
 *         description: Starred by to movie.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Update movie success
 *       500:
 *         description: Fail update movie
 */
router.put('/update/:id', validation(updateMovieValidation), securityHelper.isAuthenticated, moviesController.updateMovie);

/**
 * @swagger
 * /api/v1/movies/delete/{id}:
 *   delete:
 *     tags:
 *       - Movies
 *     description: Endpoint delete a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id to movie.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: apiKey
 *         description: Your API Key
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Delete movie success
 *       500:
 *         description: Fail delete movie
 */
router.delete('/delete/:id', securityHelper.isAuthenticated, moviesController.deleteMovie);

module.exports = router;
