var gpio = require("gpio");
var dash_button = require('node-dash-button');
var keys = require('/keys');
var action = {};
// durex = ac:63:be:24:bc:e0
// nobo  = 50:f5:da:55:48:50

var dash = dash_button(["ac:63:be:24:bc:e0","50:f5:da:55:48:50"], null, null, 'all');
dash.on("detected", function (dash_id){
    if (dash_id === "ac:63:be:24:bc:e0"){
      console.log("omg found durex");
      action = {button: 'durex', pressed: true}
    } else if (dash_id === "50:f5:da:55:48:50"){
      console.log("found nobo");
      action = {button: 'nobo', pressed: true}
    };
});

var gpio4 = gpio.export(23, {
   direction: "in",
   ready: function() {
    gpio4.on("change", function(val) {
      if (val == 1 && action['pressed']){
        sendAlert(action);
        action = {};
      } else if (val == 0){
        console.log('Closed...');
      } else if (val ==1){
        console.log("Opened...");
      } else {
        console.log(val);
      }
    });
   }
});

function sendAlert(action){
  if (action['button'] == "nobo"){
    message = "Müll raus bringen Diggggaaa!!!";
  } else if (action['button'] == 'durex'){
    message = "Noch keine ahnung jaaaa";
  };

  var client = require('twilio')(keys.sid, keys.token);

    client.messages.create({
        to: keys.number,
        from: '+1 650-549-9548',
        body: message,
    }, function (err, message) {
        console.log(message);
    });
}
