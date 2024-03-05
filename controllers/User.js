const express = require('express')
const app = express()
const User = require('../models/User')
const CustomErorr = require('../errors')



const getUser = async (req,res)=>{
    res.send('Get user')
}


const updateUser = async (req,res)=>{
    res.send('update user')
}

const deleteUser = async (req,res)=>{
    res.send('Delet user')
}

module.exports = { getUser, updateUser, deleteUser}