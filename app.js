// Import my modules
const {update, checkForStales, writeToFile, convertToJSON, triggerWebhook} = require('./modules/index');

// Gets most recent versions of the docs and docsmith
update();

// Does exactly what it says it's doing
checkForStales
  .then(writeToFile)
  .then(convertToJSON)
  .then(triggerWebhook)
  .then(console.log)
  .catch(console.error);
