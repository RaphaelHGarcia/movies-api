'use strict';

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      database: 'movies_api',
      user:     'root',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'movies_api',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-03.cleardb.net',
      database: 'heroku_e552c7a1909002a',
      user:     'b05ac2a7331050',
      password: '28affa95'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
