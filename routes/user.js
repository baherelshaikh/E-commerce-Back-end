const express = require('express')
const router = express.Router()
const { getAllUsers,
        getSingleUser,
        showCurrentUser,
        updateUser, 
        updateUserPassword, 
        deleteUserAccount } = require('../controllers/User')
const { authenticateUser, authorizePermissions } = require('../middleware/authenticateUser')


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/:id').get(authenticateUser,getSingleUser)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/deleteUserAccount').delete(authenticateUser, deleteUserAccount)

module.exports = router