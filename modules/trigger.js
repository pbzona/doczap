const https = require('https');

// Triggers the Zapier webhook by sending a given JSON object as the body
module.exports = function(object) {
  var triggerPromise = new Promise(function(resolve, reject) {
    var postData = JSON.stringify(object);

    // Options for the HTTPS request
    var {reqOptions} = require('../config/config');

    // Define the request
    var req = https.request(reqOptions, (res) => {
      res.on('end', () => {
        console.log(`STATUS: ${res.statusCode}`);
      });
    })

    // Error handler for the request
    req.on('error', (err) => {
      reject(`Error with HTTPS request: ${err.message}`);
    });

    // Write the stale docs object to the body
    req.write(postData, function() {
      resolve('DONE');
    });
    req.end();
  });

  return triggerPromise;
}
