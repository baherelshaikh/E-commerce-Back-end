const express = require('express')
const app = express()
const User = require('../models/User')
const CustomErorr = require('../errors')
const {checkPermissions} = require('../utils')
const { StatusCodes } = require('http-status-codes')



const getAllUsers = async (req,res)=>{
    const users = await User.find({role: 'user'}).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res)=>{
    const user = await User.findOne({_id: req.params.id}).select('-password')
    if (!user) throw new CustomErorr.NotFoundError(`NO user with id: ${req.params.id}`)

    checkPermissions(req.user, user._id) // you can get the user just in two cases --> (you are the admin) or (that user is you).
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}

const updateUser = async (req,res)=>{
    res.send('update user')
}

const updateUserPassword = async (req, res)=>{
    res.send('update password')
}

const deleteUser = async (req,res)=>{
    res.send('Delet user')
}

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword, deleteUser}