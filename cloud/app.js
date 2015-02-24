
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// Create a route that will respond to am HTTP GET request with some
// simple TwiML instructions
app.get('/testing', function(req, res) {
  	var twilio = require('twilio');
    // Create a TwiML response generator object
    var twiml = new twilio.TwimlResponse();
 
    // add some instructions
    twiml.say('Hi Dave & Joe! Can you believe that we got this working??? Should be really cool when we put it in our Focus app! Thanks again for having me onboard the project, let\'s kicksome ass', {
        voice:'woman'
    });
 
    // Render the TwiML XML document
    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/testing', function(req, res) {
  	var twilio = require('twilio');
    // Create a TwiML response generator object
    var twiml = new twilio.TwimlResponse();
 
    // add some instructions
    twiml.say('Hi Dave & Joe! Can you believe that we got this working??? Should be really cool when we put it in our Focus app! Thanks again for having me onboard the project, let\'s kicksome ass', {
        voice:'woman'
    });
 
    // Render the TwiML XML document
    res.type('text/xml');
    res.send(twiml.toString());
});

// Create a route that will respond to am HTTP GET request with some
// simple TwiML instructions
app.get('/call', function(req, res) {
    var twilio = require('twilio');
    // Create a TwiML response generator object
    var twiml = new twilio.TwimlResponse();

    // var from = req.param('from');
    var to_var = req.body.to;
    twiml.say('Welcome to Focus Driving, your call is starting', {
        voice:'woman'
      })
    .dial( to_var.toString(), {callerId:'test'} );
    
    // Render the TwiML XML document
    res.type('text/xml');
    res.send(twiml.toString());
});

// Create a route that will respond to am HTTP GET request with some
// simple TwiML instructions
app.post('/call', function(req, res) {
    var twilio = require('twilio');
    // Create a TwiML response generator object
    var twiml = new twilio.TwimlResponse();

    var from_var = req.body.From;
    var to_var = req.body.To;
    twiml.say('Welcome to Focus Driving, your call is starting', {
        voice:'woman'
      })
    // .dial( twiml.client(to_var.toString() ), {callerId:from_var.toString()});
    .dial( {callerId:from_var.toString()}, function() {
      this.client( to_var.toString() );
    });
    // .client( to_var.toString() );
    // .dial( to_var.toString(), {callerId:'Tim'} );
    
    // Render the TwiML XML document
    res.type('text/xml');
    res.send(twiml.toString());
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
app.post('/test', function(req, res) {
  // POST http://example.parseapp.com/test (with request body "message=hello")
  res.send(req.body.message);
});

// Attach the Express app to Cloud Code.
app.listen();
