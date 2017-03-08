const fs = require('fs');
const conf = require('../config/config');

// writes the stale docs list to a csv list
module.exports = function(input) {
  var writePromise = new Promise(function(resolve, reject) {
    // add headers for automatic labeling when converted to json
    var headers = 'modified\tauthor\ttitle\n';
    var docString = headers + input;

    // write the string to a csv file
    fs.writeFile(conf.csvFile, docString, function(err) {
      if (err) {
        reject(new Error(`Error writing to CSV file: ${err.message}`));
      }

      // if successful, pass the input through as a promise for next step
      resolve(docString);
    });
  });

  return writePromise;
}
