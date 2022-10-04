const allowedCors = require('../utils/allowedCors');

module.exports.allowCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    next();
  }
};
