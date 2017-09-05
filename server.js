const express = require('express')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const bodyParser = require('body-parser')
const app = express()

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

// set up bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



//routes
app.get('/', function (req, res) {
  dal.getRobos()
  const robobots = dal.getUsers()
  res.render('list', { robots: robobots })
})

app.get('/list', function(req,res){
  dal.getRobos()
  const robobots = dal.getUsers()
  res.render('list', {robots: robobots})
})

 app.get('/employed', function (req, res){
   dal.getAllEmployed()
   const employedros = dal.getEmployed()
  //  console.log(employedros);
   res.render('employed', {robots: employedros})
 })

 app.get('/searching', function(req, res){
   dal.getAllUnemployed()
   const unemployedros = dal.getUnemployed()
   res.render('searching', {robots: unemployedros})
 })


//set to port 300
app.set('port', 3000)

app.listen(app.get('port'), function () {
  console.log('server started on port: 3000')
})
