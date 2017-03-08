const fs = require('fs');
const path = require('path');
const {exec, execSync} = require('child_process');

// Need this for sanitizing file paths below
const util = require('../modules/util');

// Creates a backup CSV file of any stale docs. Change this to modify its location
var csvFile = './stale-docs.csv';

// Define file locations and relative paths for docsmith tasks
var docsmithPath = '~/docsmith';
var pathToDocsmith = util.cleanUp(path.relative('.', `${docsmithPath}`));
var pathToDocs = util.cleanUp(path.relative('.', `${util.cleanUp(path.join(docsmithPath, 'source'))}`));

// Number of months to use as the cutoff when defining "stale" - default 24
var staleAge = 24;

// List of commands used when checking for stale guides
var cmd = {
  getDocs: `cd ${pathToDocs} && git pull https://github.com/linode/docs.git`,
  getThor: `cd ${pathToDocsmith} && thor upgrade`,
  staleDocSearch: `cd ${pathToDocsmith} && thor search:old -m ${staleAge} -t`
}

// Options for the request to be made - add webhook path before using!
var reqOptions = {
  port: 443,
  hostname: 'hooks.zapier.com',
  path: '',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
}

module.exports = {
  csvFile,
  cmd,
  reqOptions
}
