const {exec} = require('child_process');
const {cmd} = require('../config/config');

// Promise to filter the docs for stale guides
module.exports = new Promise(function(resolve, reject) {
  exec(cmd.staleDocSearch, (err, stdout, stderr) => {
    if (err || stderr) {
      reject(new Error(`Error checking for stales: ${err.message || stderr}`));
    }

    resolve(stdout);
  })
});
