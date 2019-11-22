const crypto = require('crypto');
const request = require('request');
const pubkey = 'cf6fba0fe2ff075b1a326f1d3d8263f5';
const privkey = '7a52e6356ee5f3eb9d48ef0ade465c5abdb2e6b5';

const utils = {
  tokenize: () => {
    const ts = Date.now();
    const hash = crypto.createHash('md5');
    const data = hash.update(ts + privkey + pubkey, 'utf-8');
    const genHash = data.digest('hex');
    return { ts, apikey: pubkey, hash: genHash };
  },
  call: (options, callback, res, next) => {
    try {
      request(options, (err, resp, body) => callback(err, resp, body, res));
    } catch(err) {
      next(err);
    }
  },
  axios: (options, callback, res, next) => {
    function getAPI(req,res){
      axios.get('http://datasource.kapsarc.org/api/datasets/1.0/search/?rows=500')
        .then(function (response) {
          var api = req.path;
          var dataset = response.data;
          client.setex(api, 50, JSON.stringify(dataset));
          console.log("from API");
          res.send(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
     }
  }
}

module.exports = utils;