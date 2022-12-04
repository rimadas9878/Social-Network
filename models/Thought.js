const { Schema, model } = require('mongoose');

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
  meta: {
    reactions: Number,
    reactionCount: Number,
  }
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
    .get(function(){
        return this.meta.reactionCount;
    });

const Thought = model('thought', thoughtScheme);

module.exports = Thought;
