var gpio = require("gpio");
var dash_button = require('node-dash-button');
$.getScript("keys.js", function(){
   alert("Script loaded.");
});

var action = {};
// durex = ac:63:be:24:bc:e0
// nobo  = 50:f5:da:55:48:50

var dash = dash_button(["ac:63:be:24:bc:e0","50:f5:da:55:48:50"], null, null, 'all');
dash.on("detected", function (dash_id){
    if (dash_id === "ac:63:be:24:bc:e0"){
      action = {button: 'durex', pressed: true}
      console.log("omg found durex");
    } else if (dash_id === "50:f5:da:55:48:50"){
      action = {button: 'nobo', pressed: true}
      console.log("found nobo");
    }
});

var gpio4 = gpio.export(23, {
   direction: "in",
   ready: function() {
    gpio4.on("change", function(val) {
      if (val == 1 && action['pressed']){
        sendAlert();
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
  if (action.button == "durex"){
    message = "Müll raus bringen Diggggaaa!!!";
  } else if (action['button'] == 'nobo'){
    message = "Noch keine ahnung jaaaa";
  }

  var client = require('twilio')(sid, token);

    client.messages.create({
        to: number,
        from: '+1 650-549-9548',
        body: message,
    }, function (err, message) {
        console.log(message.sid);
    });
}
