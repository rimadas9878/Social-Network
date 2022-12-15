const { User, Thought } = require('../models');

module.exports = {

    //create thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No thoughts created' })
                    : res.json('Thoughts added to the user 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get all thoughts
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    //updating thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : User.findOneAndUpdate(
                        { dbThoughtData: req.params.thoughtId },
                        { $pull: { dbThoughtData: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({
                        message: 'Thought created but no user with this ID!',
                    })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    //Creating Reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res
                        .status(404)
                        .json({ message: 'Thought created but no user with this ID!' })
                    : res.json(dbThoughtData)
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
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

}