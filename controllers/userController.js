const User = require('../models/User');

module.exports = {

    //create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    //get all users
    getUsers(req, res) {
        User.find()
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    //get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((dbUserData) =>
                !dbUserData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //update a user
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true }
        )
        .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    //delete a user
    deleteUser(req,res){
        User.findOneAndDelete(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
        )
    }
}