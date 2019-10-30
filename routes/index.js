const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');
const pubkey = 'cf6fba0fe2ff075b1a326f1d3d8263f5';
const privkey = '7a52e6356ee5f3eb9d48ef0ade465c5abdb2e6b5';

/*
Request Url: http://gateway.marvel.com/v1/public/comics
Request Method: GET
Params: {
  "apikey": "your api key",
  "ts": "a timestamp",
  "hash": "your hash"
}
Headers: {
  Accept: * /*
}
*/

const getComics = (req, res, next) => {
    const ts = Date.now();
    const hash = crypto.createHash('md5');
    const data = hash.update(ts+privkey+pubkey, 'utf-8');
    const gen_hash= data.digest('hex');
    const qs = { apikey: pubkey, ts, hash: gen_hash }
    request({
        uri: 'http://gateway.marvel.com/v1/public/comics',
        qs,
    })
    .pipe(res);
}    

router
//   .route('/api/v1/comics/:id')
  .route('/api/v1/comics')
  .get(getComics);

module.exports = router;