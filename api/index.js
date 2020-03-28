const routes = require('express').Router();
const redisService = require('../services/redisService');


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.get('/pincode/:pin', async function (req, res) {
  let all = JSON.parse(await redisService.getRedis().get(req.params.pin))
  if(!all){
    res.send({message: 'Data not available for the requested pincode'});
  }else{
    res.send(all);
  }
});

module.exports = routes;