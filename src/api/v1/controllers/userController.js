'use strict';

import User          from '../models/users';
import usersServices from '../services/usersServices';

const userController = {
  createUser,
  authenticate
}

function createUser(req, res, next) {
  const dataUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  usersServices.createUser(dataUser)
               .then(user => res.jsonp({status_code: 200, message: 'User successfully created.'}))
               .catch(err =>  res.status(500).jsonp({status_code: 500, message: 'This user is already registered.'}));
}

function authenticate(req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  usersServices.authenticate(data)
               .then(jwt => {
                 if(jwt.error) return res.status(401).jsonp({status_code: 401, message: jwt.error})
                 res.jsonp({status_code:200, apiKey: jwt})
               })
               .catch(err => res.status(500).jsonp({status_code: 500, message: err.error }));
}

export default userController;
