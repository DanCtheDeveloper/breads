const express = require('express')
const app = express()

//configuration:
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

  
// Breads/middleware:
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//routes:
app.get('/', (req, res) => {
    res.send('Welcome to the World of Bread!')
})
  
//Adding Comment Checking Git

app.listen(PORT, ()=> {
    console.log('listening on port: ', PORT)
})
// https://digitalskills.instructure.com/courses/9255/pages/code-along-be-3-server-side-views-and-rendering-with-jsx?module_item_id=1307340#