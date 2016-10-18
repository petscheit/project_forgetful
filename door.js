var gpio = require("gpio");
var gpio4 = gpio.export(23, {
   direction: "in",
   ready: function() {
    gpio4.on("change", function(val) {
      if (val == 1){
        console.log('Open...');
      } else if (val == 0){
        console.log('Closed...');
      } else {
        console.log(val);
      }
    });
   }
});
