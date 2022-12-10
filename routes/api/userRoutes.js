const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/thoughts/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;