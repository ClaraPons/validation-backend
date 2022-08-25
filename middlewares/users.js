const users = require('../users')

const checkIfExist = (req, res, next) => {
    const findUser = users.find((user) =>{
        return user.slug === req.params.slug
    })

    if(findUser){
        req.findUser = findUser
        next()
    }else{
        res.status(404).json('User not Found')
    }
}

module.exports = {
    checkIfExist
}