const express = require("express")
const path = require("path")
const exphbs = require('express-handlebars')
const morgan = require("morgan")


//Initializations
const app = express()

//Settings
app.set("port", process.env.PORT || 4000)
app.set("views", path.join( __dirname, 'views'))

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
})
app.engine(".hbs", hbs.engine)
app.set("view engine", ".hbs")

//Middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))


//Global Variables

//Routes
app.use(require("./routes/index.routes"))
app.use(require("./routes/notes.routes"))

//Static Files (archivo public)
app.use(express.static(path.join( __dirname, 'public')))

module.exports = app