'use strict';

import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);
const redisService = {
  client,
  time: 7200
}

redis.RedisClient.prototype.remove = key => {
  client.keys(key, (err, rows) => rows.map((row, next) => client.del(row, next) ))
}

export default redisService;
