const { User, Thought } = require('../models');

module.exports = {

    //get all thoughts
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //create thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.thoughtId },
                    { $addToSet: { thought: thought._id } },
                    { new: true }
                )
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts created' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //updating thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !video
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //deleting a thought
    deleteThought(req, res) {
        Video.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : User.findOneAndUpdate(
                        { thought: req.params.thoughtId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created but no user with this ID!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    //Creating Reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToset: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Thought created but no user with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //deleting Reaction

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought find with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

}