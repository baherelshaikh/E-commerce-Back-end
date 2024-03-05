const express = require('express')
const app = express()
const User = require('../models/User')
const CustomErorr = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse, jwtHandling } = require('../utils');



const register = async (req,res)=>{
    const {name, email, password} = req.body
    const EmailAlreadyExists = await User.findOne({email})

    if(EmailAlreadyExists) throw new CustomErorr.BadRequestError('Email is Already exist')

    const isTheFirst = (await User.countDocuments({})) === 0
    const role = isTheFirst ? 'admin' : 'user'

    const user = await User.create({name, email, password, role})
    const token = jwtHandling(user)
    attachCookiesToResponse({res, user: token})

    res.status(StatusCodes.CREATED).json({ user: token });
}

module.exports = {register}