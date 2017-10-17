// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var csvParser = require('csv-parse');
var fs = require('fs');

var airports, flights;
var parser1 = csvParser({columns: true}, /*{delimiter: ','},*/ function(err, data){
  console.log(data);
  airports = data;
});
var parser2 = csvParser({columns: true}, /*{delimiter: ','},*/ function(err, data){
  console.log(data);
  flights = data;
});
fs.createReadStream(__dirname+'/airports.csv').pipe(parser1);
fs.createReadStream(__dirname+'/flights.csv').pipe(parser2);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/airport', function(req, res) {
    res.json(airports);
});

router.get('/flight', function(req, res) {
    res.json(flights);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
