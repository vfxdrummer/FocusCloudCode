var express = require('express');
var app = express();

// Global app configuration section.
app.use(express.bodyParser());

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// get twilio token
Parse.Cloud.define("token", function(request, response) {
  var twilio = require('twilio');
  var accountSID = 'AC17aa64762866918328ad2bdd4382f594';
  var authToken = 'f91d9e5cdb3f08e2d17e410a4601841b';
  var appSid = 'AP91929ec65ae9377af2c47cd245659c8a';
  var capability = new twilio.Capability(accountSID, authToken);

  //Create a capability token using the TwiML app with sid "AP123"
  capability.allowClientOutgoing(appSid);
  capability.allowClientOutgoing('tim');
  capability.allowClientIncoming('joe');
  capability.allowClientIncoming('tim');
  var token = capability.generate();
  response.success(token);
});

// default endpoint
Parse.Cloud.define("welcome", function(request, response) {
  var twilio = require('twilio');
  var resp = new twilio.TwimlResponse();
  resp.say('Welcome to Twilio!');

  // Render the TwiML XML document
  response.success(resp.toString());
});

// say hello
Parse.Cloud.define("helloTwiML", function(request, response) {
  var twilio = require('twilio');
  var resp = new twilio.TwimlResponse();
  resp.say('Hello!');

  // Render the TwiML XML document
  response.success(resp.toString());
});