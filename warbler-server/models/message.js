// model for our message
const mongoose = require('mongoose');
const User = require('./user.js');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true
  }
);

// we don't want a situation where we delete a message, but a user still has that ID of the message
messageSchema.pre('remove', async function(next) {
  try {
    let user = await User.findById(this.user);
    user.messages.remove(this.id);
    console.log(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;