const checkForStales = require('./check');
const writeToFile = require('./write');
const convertToJSON = require('./convert');
const triggerWebhook = require('./trigger');
const update = require('./update');

module.exports = {
  checkForStales,
  writeToFile,
  convertToJSON,
  triggerWebhook,
  update
}
