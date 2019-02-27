const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    })
    let {id, username, profileImageUrl} = user;
    // checking if their password matches what was sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    // if it all matches, log them in by creating JWT tokes and sending it back in a response
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid email/password'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid email/password'
    });
  }
}

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let {id, username, profileImageUrl} = user;
    // create a token (signing a token) with a secret from our env
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // this is a specific code when a validation fails
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is already taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}