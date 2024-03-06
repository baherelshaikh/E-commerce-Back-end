const express = require('express')
const app = express()
const User = require('../models/User')
const CustomErorr = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse, jwtHandling } = require('../utils');



const register = async (req,res)=>{
    const {name, email, password} = req.body
    if (!name || !email || !password) throw new CustomErorr.BadRequestError('Please provide All Credentials')

    const EmailAlreadyExists = await User.findOne({email})
    if(EmailAlreadyExists) throw new CustomErorr.BadRequestError('Email is Already exist')

    const isTheFirst = (await User.countDocuments({})) === 0
    const role = isTheFirst ? 'admin' : 'user'

    const user = await User.create({name, email, password, role})

    const token = jwtHandling(user)
    attachCookiesToResponse({res, user: token})

    res.status(StatusCodes.CREATED).json({ user: token });
}

const login = async (req, res)=>{
    const {email, password} = req.body
    if (!email || !password) throw new CustomErorr.BadRequestError('Please provide an email and password')

    const user = await User.findOne({ email })
    if (!user) throw new CustomErorr.UnauthenticatedError('Invalid email')

    const comparePassword = await user.comparePassword(password)
    if (!comparePassword) throw new CustomErorr.UnauthenticatedError('Invalid password')

    const token = jwtHandling(user)
    attachCookiesToResponse({res, user: token})

    res.status(StatusCodes.OK).json({user: token})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
module.exports = {register, login, logout}