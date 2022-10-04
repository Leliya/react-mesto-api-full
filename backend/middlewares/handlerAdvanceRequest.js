module.exports.handlerAdvanceRequest = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  return next();
};
