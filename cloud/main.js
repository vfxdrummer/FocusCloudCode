
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
  var capability = new twilio.Capability(accountSID, authToken);

  //Create a capability token using the TwiML app with sid "AP123"
  capability.allowClientOutgoing('tim');
  capability.allowClientIncoming('joe');
  var token = capability.generate();
  response.success(token);
});
