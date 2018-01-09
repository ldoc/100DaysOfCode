const path = require('path'); // path module help us to access path routes
const SRC_DIR = path.resolve(__dirname, 'app/src'); // Source directory
const DIST_DIR = path.resolve(__dirname, 'app/dist'); // Distribution directory
const webpack = require('webpack');

module.exports = {
  entry: SRC_DIR + '/index.js', // My entry file
  // My output file
  output: { 
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      // Loader for JSX files  
      {                                   
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: ['url-loader']
      }
    ]
  },
  // Source mapping allow us to debug code from src files
  devtool: 'source-map',
  // Dev Server configuration
  devServer: { 
    contentBase: './app/dist',
    hot: true // with hot reload
  },
  plugins : [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};