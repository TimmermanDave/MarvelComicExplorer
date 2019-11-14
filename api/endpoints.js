const express = require('express');
const router = express.Router();
const { tokenize, call } = require('./utils');

const callback = (err, resp, body, res) => {
  // Add extra business rules here...

  if (!err && resp.statusCode === 200) {
    // console.log(body);
    res.json(body);
  } else {
    res.json(err);
  }
}

router.route('/v1/:endpoint?/:uid?/:category?').get((req, res, next) => {
  const tokens = tokenize();
  const endpoint = Object.keys(req.params)
  .reduce((result, key, i) => {
    if(!req.params[key]) return result;
    return `${result}/${req.params[key]}`; // add params
    // return `${result}${i ? '&' : '?'}${key}=${req.params[key]}`; //add querystring
  }, `http://gateway.marvel.com/v1/public/`);
  const options = { uri: endpoint, qs: { ...tokens, ...req.query }};
  call(options, callback, res, next);
});

module.exports = router;