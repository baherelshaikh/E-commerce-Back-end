const CustomErorr = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return;
    console.log(requestUser.userId, resourceUserId)
    if (requestUser.userId === resourceUserId.toString()) return;
    
    throw new CustomErorr.UnauthorizedError(
        'Not authorized to access this route'
    );
};

module.exports = {checkPermissions}