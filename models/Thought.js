const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtScheme = new Schema({
  thoughtText: {
    type: String,
    minLength: 15,
    maxLength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtScheme
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtScheme);

module.exports = Thought;
