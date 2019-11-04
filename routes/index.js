const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');

const tokenize = () => {
  const pubkey = 'cf6fba0fe2ff075b1a326f1d3d8263f5';
  const privkey = '7a52e6356ee5f3eb9d48ef0ade465c5abdb2e6b5';
  const ts = Date.now();
  const hash = crypto.createHash('md5');
  const data = hash.update(ts + privkey + pubkey, 'utf-8');
  const genHash = data.digest('hex');
  return { ts, apikey: pubkey, hash: genHash };
}

const endpointify = (req) => {
  return Object.keys(req.params)
    .reduce((result, key, i) => {
      if(!req.params[key]) return result;
      return `${result}/${req.params[key]}`; // add params
      // return `${result}${i ? '&' : '?'}${key}=${req.params[key]}`; //add querystring
    }, `http://gateway.marvel.com/v1/public/`);
}

const responsify = (err, resp, body, res) => {
  // Add extra business rules here...

  if (!err && resp.statusCode === 200) {
    // console.log(body);
    res.json(body);
  } else {
    res.json(err);
  }
}

const callMarvel = (req, res, next) => {
  const tokens = tokenize();
  const endpoint = endpointify(req);
  const options = { uri: endpoint, qs: { ...tokens, ...req.query }};
  try {
    request(options, (err, resp, body) => responsify(err, resp, body, res));
  } catch(err) {
    next(err);
  }
}

const callDocs = (req, res, next) => {
  const tokens = tokenize();
  const options = { uri: 'http://gateway.marvel.com/docs/public', qs: { ...tokens }};
  try {
    request(options, (err, resp, body) => responsify(err, resp, body, res));
  } catch(err) {
    next(err);
  }
}

router.route('/v1/:endpoint?/:uid?/:category?').get(callMarvel);
router.route('/docs').get(callDocs);

module.exports = router;