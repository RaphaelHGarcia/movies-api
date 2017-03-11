'use strict';

import User           from '../models/users';
import Promisse       from 'bluebird';
import bcrypt         from 'bcrypt-nodejs';
import securityHelper from '../helpers/security';

const usersServices = {
  createUser,
  authenticate
}

function createUser(dataUser){
  return new Promise((resolve, reject) => {
    User.forge(dataUser)
        .save()
        .then(user => resolve(user))
        .catch(err => reject(err));
  });
}

function authenticate(data){
  return new Promise((resolve, reject) => {
    if(!data.password) return reject({error: 'You should pass your password'})
    User.where({email: data.email})
        .fetch()
        .then(user => {
          bcrypt.compare(data.password, user.get('password'), (err, isMatch) => {
            if(!isMatch) return resolve({error: 'Invalid email or password'});
            if(err) return reject({error: err});
            securityHelper.createJWTForUser(user.toJSON()).then(jwt => resolve(jwt));
          });
        })
        .catch(err => reject(err));
  });
}

export default usersServices;
