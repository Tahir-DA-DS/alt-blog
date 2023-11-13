require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override');
const expressLayout = require('express-ejs-layouts')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const authuser = require('./server/middleware/Auth')

const adminRoute = require('./server/routes/admin')
const blogRoute = require('./server/routes/blog')
const mainRoute = require('./server/routes/main')


const app = express()
const PORT = 5000 || process.env.PORT

app.use(express.static('public'))
app.use(expressLayout)

const connectDb = require('./server/config/db')
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

connectDb()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}))

app.use('/', adminRoute)
app.use('/', blogRoute)
app.use('/', mainRoute)

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
})