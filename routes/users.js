const express = require('express')
const app = express('')
const users = require('../users')
const slugify = require('slugify')
const { body, validationResult } = require('express-validator')
const { checkIfExist } = require('../middlewares/users')

const cities = ['Paris', 'Los Angeles', 'Tokyo']

app.get('/', (req, res) => {
    res.json(users)
})

app.get('/:slug', checkIfExist, (req, res) => {    
    res.json(req.findUser)
})

app.post('/',
    body('name').isLength({min: 4}).withMessage("Name length isn't right"),
    body('password').isLength({min: 8}).withMessage("Password length isn't right"),
    body('city').isIn(cities).withMessage("City isn't in the list"),
    body('email').isEmail().withMessage("this isn't a email"),
    (req, res) => {
        const { errors } = validationResult(req)
        // console.log(req.body);

        const user = {
            ...req.body,
            slug: slugify(req.body.name, {lower: true}) 
        }

        if(errors.length > 0) {
            res.status(400).json(errors)
        }else{
            users.push(user)
            res.json(user)
        }
        // console.log(user);

})


module.exports = app