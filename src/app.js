const path = require("path")
const express = require("express")
const hbs = require("hbs")

const getGeocode = require("./getGeocode")
const getWeather = require("./getWeather")

const app = express();

// Defined paths for express config
const publicDirectoryPath=path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// setup for public directory to serve 
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Desmond"
  })
})

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Help page"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Desmond"
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "No search address is not provided"
    })
  }
  getGeocode(req.query.address, (error, {lat, lon, place_name}={}) => {
    if(error){
      return res.send(error)
    }
    getWeather(lat,lon, (error, response) => {
      if(error){
        res.send(error)
      }else {
        res.send({
          place_name,
          ...response
        })
      }
    })
  })
  // console.log(req.query.address)
  // res.send({forecast:"It is rainy", location: "kumasi", address: req.query.address})
})

app.get("*", (req, res) => {
  res.send("404 page not found")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})