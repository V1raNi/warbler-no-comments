const db = require('../models');

exports.createMessage = async function(req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    // we populate because when we put the 'tweets' on the page, we're going to need the username and profile picture of the user so that we don't have to query the database again in a different request
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
}

exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.find(req.params.message._id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
}

exports.deleteMessage = async function(req, res, next) {
  try {
    // we don't use findByIdAndRemove since we have a pre 'remove' hook in our message schema
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (err) {
    console.log(req.params.message_id);
    return next(err);
  }
}
