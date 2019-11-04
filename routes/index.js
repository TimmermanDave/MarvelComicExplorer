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

const call = (req, res, next) => {
    const tokens = tokenize();
    const qs = { ...tokens, ...req.query };
    const uri = `http://gateway.marvel.com/v1/public/${req.params.uri}`;
    const options = { uri, qs };
    try {
      request(options).pipe(res);
    } catch(err) {
      next(err);
    }
}

router.route('/api/v1/:uri').get(call);

module.exports = router;