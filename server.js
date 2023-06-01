const express = require('express')
const app = express()

//configuration:
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

  
// Breads:
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//routes:
app.get('/', (req, res) => {
    res.send('Welcome to the World of Bread!')
})
  
//Adding Comment Checking Git

app.listen(PORT, ()=> {
    console.log('listening on port: ', PORT)
})
