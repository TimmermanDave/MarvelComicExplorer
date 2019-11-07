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
  }
}

module.exports = utils;