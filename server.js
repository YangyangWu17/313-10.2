//dependencies
const express = require('express')
const bodyParser = require('body-parser')

const User = require('./models/User')
const Task = require("./models/Task")
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const session = require('express-session')
const e = require('express')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())

app.use(session({
  secret: '$$$DEakinSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 120000 }
}))
app.use(passport.initialize());
app.use(passport.session());

const uri = 'mongodb://127.0.0.1:27017/iCrowdTaskDB'

// mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//routes 

app.get('/', (req, res) => {
  const user = {
    username: "deakin",
    password: "sit313"
  }
  res.send(user)
})
app.post('/register', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save()
  res.json(('saved to db:' + user));
})
app.get('/deakin', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/deakin.html')
  }
  else { res.sendFile(__dirname + '/login.html') }
})

// register route 
app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (user != null) {
      if (!user.password.localCompare(req.body.password)) {
        res.json('success');
      } else {
        res.json("Password is wrong!")
      }
    } else {
      res.json("Username not registered")
    }
  })
})
app.post('/task', (req, res) => {
  const task = new Task({
    type: req.body.type,
    title: req.body.title,
    description: req.body.description,
    expiryDate: req.body.expiryDate,
    setting: req.body.setting,
    master: req.body.master,
    reward: req.body.reward,
    number: req.body.number,
    image: req.body.image
  })
  task.save()
  res.json(('saved to db:' + task));
})
app.post('/upload', (req, res) => {
  const task = new Task({
    image: req.body.image
  })
  task.save()
  res.json(('saved to db:' + task));
})
app.get('/deakin', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/deakin.html')
  }
  else { res.sendFile(__dirname + '/login.html') }
})


app.route('/workers')
  .get((req, res) => {
    Task.find((err, taskList) => {
      if (err) { res.send(err) }
      else { res.send(taskList) }
    })
  })
  .post((req, res) => {

  })
app.route('/workers/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, (req, res) => {
  console.log("Server is running successfullly!")
})