require('dotenv').config()
const express = require("express")
const app = express()
const ejs = require("ejs")
const path =require('path')
const expressLayout = require('express-ejs-layouts')
const PORT= process.env.PORT || 3000

const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo').default

//Database connection
let db_url = 'mongodb://localhost/foodkings'
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})

// const connection = mongoose.Connection
// connection().once('open', () =>{
//     console.log('Database connected...')
// }).catch(error => {
//     console.log('Connection failed...')
// })

//session store
let mongoStore = new MongoDbStore({
    mongoUrl: db_url,
    collection: 'sessions'
  })
//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  store: mongoStore,
  saveUninitialized:false,
  cookie:{ maxAge:1000*60*60*24}//24hours
}))

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json())

// globel middleware
app.use((req,res, next)=>{
  res.locals.session = req.session
  next()
})

// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web.js')(app)


app.listen(PORT, () =>{
    console.log(`Listenting  onport ${PORT}`)
})