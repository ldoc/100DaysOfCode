const path = require('path');                     // path module help us to access path routes
const SRC_DIR = path.resolve(__dirname, 'app/src');
const DIST_DIR = path.resolve(__dirname, 'app/dist');

module.exports = {
  entry: SRC_DIR + '/index.js',                    // My entry file
  output: {                                       // My output file
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};