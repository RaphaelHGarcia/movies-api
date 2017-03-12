'use strict';

import redis from 'redis';

const client = redis.createClient(42509, 'pc82252fc917fb325225cb2751af99049147b0aa7cfda498f095b7d55f1a5e7ca@ec2-34-198-54-21.compute-1.amazonaws.com');
const redisService = {
  client,
  time: 7200
}

redis.RedisClient.prototype.remove = key => {
  client.keys(key, (err, rows) => rows.map((row, next) => client.del(row, next) ))
}

export default redisService;
