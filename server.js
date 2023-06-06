const express = require('express')
const app = express()
const methodOverride = require('method-override')

//configuration:
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//routes:
app.get('/', (req, res) => {
    res.send('Welcome to the World of Bread!')
})
  
// Breads/middleware:
const breadsController = require('./controllers/breads_controller.js')
app.use(methodOverride('_method'))
app.use('/breads', breadsController)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


  
// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })
  


//Adding Comment Checking Git

app.listen(PORT, ()=> {
    console.log('listening on port: ', PORT)
})
// https://digitalskills.instructure.com/courses/9255/pages/code-along-be-3-server-side-views-and-rendering-with-jsx?module_item_id=1307340#