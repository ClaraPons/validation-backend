const express = require('express')
const app = express('')
const cors = require('cors')
const morgan = require('morgan')
const port = 5006
const getUsers = require('./routes/users')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/users', getUsers)

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})