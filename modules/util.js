// clean up path outputs, which are giving unexpected linebreaks/space
var cleanUp = function(string) {
  return string.replace(/\s/g,'')
}

module.exports = {cleanUp};
