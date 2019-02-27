require('dotenv').load();
const jwt = require('jsonwebtoken');

// we use callbacks because jwt library seems to be using callbacks, and not promises
exports.loginRequired = function(req, res, next) {
  // even though it's not an async function, we use try catch to handle situation where header is undefined
  try {
    // the way that this header usually comes as Bearer <token>, so we split it by ' '
    const token = req.headers.authorization.split(' ')[1];
    // decode the token (decoded is the payload)
    jwt.verify(token, process.env.SECRET_KEY, function(error, decoded){
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Please log in first'
        });
      }
    });
  } catch (err) {
    // if token wasn't passed in or not being interpreted correctly
    return next({
      status: 401,
      message: 'Please log in first'
    });
  }
};

// authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      // checking if there is a payload and if id in the payload is the same as whatever is coming in the URL (/api/users/:id/messages)
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
};