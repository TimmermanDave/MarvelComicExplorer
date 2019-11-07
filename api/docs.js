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

router.route('/').get((req, res, next) => {
  const tokens = tokenize();
  const endpoint = 'http://gateway.marvel.com/docs/public';
  const options = { uri: endpoint, qs: { ...tokens, ...req.query }};
  call(options, callback, res, next);
});

module.exports = router;