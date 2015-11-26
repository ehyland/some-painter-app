/*eslint no-var:0, no-console: 0*/
module.exports = function transformStats(data, something) {

  var stats = {};

  Object.keys(data.assetsByChunkName)
    .forEach(function(entry) {
      stats[entry] = {
        js: data.assetsByChunkName[entry].filter(function(asset) { return asset.match("\.js$") }),
        css: data.assetsByChunkName[entry].filter(function(asset) { return asset.match("\.css$") })
      };
    });

  return JSON.stringify(stats);
}
