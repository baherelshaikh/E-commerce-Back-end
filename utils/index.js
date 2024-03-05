const {jwtHandling} = require('./jwtHandling')
const {createJWT, isTokenValid, attachCookiesToResponse} = require('./jwt.js')

module.exports = {
    jwtHandling,
    createJWT, 
    isTokenValid,
    attachCookiesToResponse
}