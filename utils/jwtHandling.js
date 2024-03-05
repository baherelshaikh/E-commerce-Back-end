const jwtHandling = (user)=>{
    return {name: user.name, id: user._id, role: user.role}
}

module.exports = {jwtHandling}