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
               .catch(err =>  res.status(500).jsonp(err));
}

function authenticate(req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  usersServices.authenticate(data)
               .then(jwt => res.jsonp({jwt: jwt}))
               .catch(error => res.status(500).jsonp(error));
}

export default userController;
