const express = require('express')
const router = express.Router()
const {creatUser, getUser, updateUser, deleteUser} = require('../controllers/User')



router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router