'use strict'

import jwt      from 'jsonwebtoken';
import Promise  from 'bluebird';
import moment   from 'moment';

const securityHelper = {
  secret: '@passwordSecretJWT!',
  expires: moment().add(1,'days').valueOf(),
  createJWTForUser,
  isAuthenticated
}

function createJWTForUser(user) {
  return new Promise((resolve, reject) => {
    if(!user.id || !user.email) return reject({error: 'You must pass user id and user email'});

    const payload = {
      iss: { id: user.id, email: user.email},
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    }

    resolve(jwt.sign(payload, securityHelper.secret))
  });
}

function isAuthenticated(req, res, next){
  const token = req.query.apiKey;
  if (!token) return res.status(401).jsonp({status_code: 401, message: 'Token not proved.'})
  jwt.verify(token, securityHelper.secret, (err, data) => {
    if(err) return res.status(401).jsonp({status_code: 401, message: 'Invalid token'});
    return next();
  })
}

export default securityHelper;
