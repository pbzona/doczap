const csv = require('csvtojson');

//csvtojson options
const converterOptions = {delimiter: '\t'};

// converts the stale docs list to JSON for use in the webhook payload
module.exports = function(input) {
  var convertPromise = new Promise(function(resolve, reject) {
    // template for storing the stale docs
    var docsObject = {
      stale: []
    };

    // converts from the file into a memory object
    csv(converterOptions)
    .fromString(input)
    .on('json', (row) => {
      docsObject.stale.push(row);
    })
    .on('done', (err) => {
      if (err) reject(new Error(`Error converting to JSON: ${err.message}`));

      // This line is optional, you can uncomment it to see exactly what's being formed 
      // in case you want to customize the zap to only choose certain fields or put it through 
      // another API later
      //console.log(docsObject);
      resolve(docsObject);
    });
  });

  return convertPromise;
}
