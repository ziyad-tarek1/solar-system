const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')




app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("error!! " + err)
    } else {
      //  console.log("MongoDB Connection Successful")
    }
})

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);


// Get planet details
// http method: POST
// http path: /planet
// http body: { id: number }
// http response: planet data
app.post('/planet',   function(req, res) {
   // console.log("Received Planet ID " + req.body.id)
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            alert("Ooops, We only have 8 planets and a sun. Select a number from 0 - 8")
            res.send("Error in Planet Data")
        } else {
            res.send(planetData);
        }
    })
})

// Home page
// http method: GET
// http path: /
// http body: none
// http response: index.html
app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Get OS details
// http method: GET
// http path: /os
// http body: none
// http response: OS details
app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

// liveness probe
// http method: GET
// http path: /live
// http body: none
// http response: live status
app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

// readiness probe
// http method: GET
// http path: /ready
// http body: none
// http response: ready status
app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

// Start the server
// http method: GET
// http path: /
// http body: none
// http response: server started
// application port is 3000
app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})


module.exports = app;
