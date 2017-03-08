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

      resolve(docsObject);
    });
  });

  return convertPromise;
}
