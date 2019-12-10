const express = require('express');
const router = express.Router();
const { tokenize, call } = require('./utils');

const callback = (err, resp, body, res) => {
  // Add extra business rules here...
  console.log(body, err)

  if (!err && resp.statusCode === 200) {
    res.json(JSON.parse(body));
  } else {
    res.json(JSON.parse(err));
  }
}

/*
portrait_small	50x75px
portrait_medium	100x150px
portrait_xlarge	150x225px
portrait_fantastic	168x252px
portrait_uncanny	300x450px
portrait_incredible	216x324px

standard_small	65x45px
standard_medium	100x100px
standard_large	140x140px
standard_xlarge	200x200px
standard_fantastic	250x250px
standard_amazing	180x180px

landscape_small	120x90px
landscape_medium	175x130px
landscape_large	190x140px
landscape_xlarge	270x200px
landscape_amazing	250x156px
landscape_incredible	464x261px

detail	full image, constrained to 500px wide
full-size image	no variant descriptor
*/

router.route('/v1/:variant/:extension/').get((req, res, next) => {
  const tokens = tokenize();
  const endpoint = `${req.query.path}`;
  const options = { uri: endpoint, qs: { ...tokens, ...req.query }};
  console.log(options)
  call(options, callback, res, next);
});

module.exports = router;