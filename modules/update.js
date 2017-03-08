const {execSync} = require('child_process');
const {cmd} = require('../config/config');

module.exports = function() {
  // Gets the latest version of the docs
  execSync(cmd.getDocs);
  console.log('Done syncing docs');

  // Checks for docsmith upgrades
  execSync(cmd.getThor);
  console.log('Done upgrading thor');
}
