const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jquery = require('jquery')
const expressValidator = require('express-validator') //Moz Devs
const path = require('path') //Moz Devs

require('./database-connection')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) //Moz Devs
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)
app.use(express.static(path.join(__dirname, 'public')))

const highScore = require('./routes/routes')

app.use('/highScore', highScore)

app.get('/', (req, res, next) => {
    res.render('index')
})

module.exports = app
