
const config = require('../config/config.json');
const Redis = require('ioredis');
// create redis instance :O
let redis = null;
let initRedis = () => {
    redis = new Redis(config.redis.host, {
        password: config.redis.password,
        port: config.redis.port
    });
}

let getRedis = () =>{
    return redis;
}

module.exports = {
    initRedis,
    getRedis
}