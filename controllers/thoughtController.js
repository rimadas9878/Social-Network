const {User, Thought} = require('../models');

module.exports = {

    //get all thoughts
    getThought(req, res){
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //get single thought
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No thoughts found with this id'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //create thoughts
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
            return Thought.findOneAndUpdate(
                { _id: req.body.thoughtId},
                { $addToSet: {thought: thought._id}},
                {new: true}
            )
        })
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No thoughts created'})
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
}