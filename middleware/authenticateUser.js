const customErorr = require('../errors')
const { isTokenValid } = require('../utils')


const authenticateUser = (req, res, next)=>{
    const token = req.cookies.token
    if (!token) throw new customErorr.UnauthenticatedError('Authentication invalid')

    try {
        const { name, userId, role} = isTokenValid({ token })
        req.user = { name, userId, role}
        next()
    }catch{
        throw new customErorr.UnauthenticatedError('Authentication invalid')
    }
}

const authorizePermissions = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role))
        throw new customErorr.UnauthorizedError('Unauthorized to access this route')
        next()
    }
}
module.exports = {authenticateUser, authorizePermissions}