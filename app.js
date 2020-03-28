
const express = require('express')
var cors = require('cors');
const config = require('./config/config.json');
const Redis = require('ioredis');
const scraper = require('./jobs/scraper.js');
const redisService = require('./services/redisService');
 

const app = express()


redisService.initRedis();

const routes = require('./api');

//  Connect all our routes to our application
app.use('/', routes);

app.use(cors());
const port = config.port;

const execAll = () => {
    scraper.updateCovidData();
};
execAll()
setInterval(execAll, config.interval);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
